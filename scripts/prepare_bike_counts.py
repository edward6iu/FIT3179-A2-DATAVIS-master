"""Rebuild Figure 6's CSV from the official API response (stdlib only).

Run from any directory: python scripts/prepare_bike_counts.py
"""
import csv
import hashlib
import json
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE_URL = 'https://data.melbourne.vic.gov.au/api/explore/v2.1/catalog/datasets/annual-bike-counts-super-tuesday/exports/json'
source = ROOT / 'data/sources/super_tuesday_raw.json'
records = json.loads(source.read_text(encoding='utf-8'))
latest = max(int(row['year']) for row in records)
selected = sorted((row for row in records if int(row['year']) == latest), key=lambda row: int(row['site_id']))
assert len({row['site_id'] for row in selected}) == len(selected), 'Duplicate site/year records'
intervals = ['7_00_am','7_15_am','7_30_am','7_45_am','8_00_am','8_15_am','8_30_am','8_45_am']
rows = []
for row in selected:
    assert all(row[field] is not None for field in ['site_id','latitude','longitude','total']), 'Missing map field'
    total = int(row['total'])
    assert total >= 0 and total == row['total']
    assert all(row[field] is not None for field in intervals), 'Incomplete morning intervals'
    assert sum(int(row[field]) for field in intervals) == total, 'Interval sum differs from published total'
    rows.append({'site_id':int(row['site_id']), 'survey_year':latest,
                 'latitude':row['latitude'], 'longitude':row['longitude'],
                 'count_7_9am':total, 'description':row['description']})
with (ROOT / 'data/bike_counters.csv').open('w', newline='', encoding='utf-8') as output:
    writer = csv.DictWriter(output, fieldnames=rows[0].keys())
    writer.writeheader()
    writer.writerows(rows)
metadata = {
    'title':'Annual Bike Counts (Super Tuesday)',
    'publisher':'City of Melbourne', 'data_provider':'Bicycle Network Australia',
    'dataset_url':'https://data.melbourne.vic.gov.au/explore/dataset/annual-bike-counts-super-tuesday/',
    'api_export_url':SOURCE_URL,
    'field_metadata_url':'https://data.melbourne.vic.gov.au/api/datasets/1.0/annual-bike-counts-super-tuesday/attachments/super_tuesday_bike_counts_metadata_pdf/',
    'methodology_url':'https://bicyclenetwork.com.au/our-services/transport-surveys-and-data/super-counts/',
    'license':'CC BY 4.0', 'license_url':'https://creativecommons.org/licenses/by/4.0/',
    'retrieved':'2026-10-24', 'source_record_count':len(records),
    'records_by_year':dict(sorted(Counter(row['year'] for row in records).items())),
    'selected_year':latest, 'selected_sites':len(rows),
    'raw_snapshot':'sources/super_tuesday_raw.json',
    'raw_sha256':hashlib.sha256(source.read_bytes()).hexdigest(),
    'processing':[
        'Select all 46 survey sites from the 2017 Super Tuesday survey.',
        'Retain published site_id, latitude, longitude and intersection description.',
        'Map published total to count_7_9am matching the sum of all eight morning 15-minute intervals.',
        'Use a linear zero-based Vega-Lite size scale so circle area is proportional to cyclist count.'
    ],
    'scope':'Morning peak commuter survey (7:00 am to 9:00 am) across 46 City of Melbourne intersections.',
    'boundary':{
        'dataset_url':'https://data.melbourne.vic.gov.au/explore/dataset/municipal-boundary/',
        'export_url':'https://data.melbourne.vic.gov.au/api/explore/v2.1/catalog/datasets/municipal-boundary/exports/geojson',
        'license':'CC BY 4.0', 'retrieved':'2026-10-24',
        'processing':'Coordinates retained; ring winding normalised for D3/Vega spherical rendering.'
    }
}
(ROOT / 'data/bike_counters.source.json').write_text(json.dumps(metadata,indent=2)+'\n',encoding='utf-8')
print(f'{len(rows)} sites from {latest}; all totals match eight morning intervals; max={max(r["count_7_9am"] for r in rows)}')
