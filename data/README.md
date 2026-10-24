# Dataset inventory and sources

## Sourced transport budget dataset

`merri_bek_transport_budget.csv` replaces the unsupported cross-council spending series. Source: [Merri-bek City Council, Adopted Budget 2026–2030](https://www.merri-bek.vic.gov.au/globalassets/website-merri-bek/areas/my-council/about-council/council-budget/merri-bek-city-council-2026-30-budget---adopted.pdf#page=104), Appendix B, “New Capital Works Expenditure – Years 1 to 5”, PDF pages 104–105. Accessed 24 October 2026. The council's [budget page](https://www.merri-bek.vic.gov.au/my-council/about-council/council-budget/) identifies this as the adopted budget.

- Six recurring programs selected from the Transport category: bicycle facilities, planning/design, road safety, school active travel, Streets for People priority projects and walking facilities. They support the infrastructure story but are not an exhaustive transport list or cycling-only expenditure.
- Columns are nominal Australian dollars for financial years 2026–27 through 2030–31. These are adopted plans, not observed expenditure or historical growth.
- Dashes in the selected expenditure cells become zero planned allocation. Carry-forward is excluded; all six selected rows have none.
- Thirty annual observations were transcribed, checked against the extracted PDF text and visually reviewed in the source table. Each program's annual sum matches the published five-year total. Combined selected allocations total **$14,242,654**.
- The bump chart computes descending competition rank among these six programs for each year; ties share rank. The treemap sums each program's five annual values. Short display names are accompanied by the full source names in tooltips and the CSV.
- [Machine-readable provenance](merri_bek_transport_budget.source.json) records the source URL, PDF hash, pages, date, scope and processing. The former `lga_infrastructure_investment.csv` is no longer part of the website; no matching source could be established for its amounts.

## Sourced Super Tuesday map

`bike_counters.csv` contains all **46 survey sites in 2017** from the City of Melbourne's [Annual Bike Counts (Super Tuesday)](https://data.melbourne.vic.gov.au/explore/dataset/annual-bike-counts-super-tuesday/) dataset, provided by Bicycle Network Australia, CC BY 4.0. Retrieved 24 October 2026. The complete export has 352 records from 2010–2017; 2017 is the latest year in this export, not the latest Super Tuesday event ever conducted. The portal's later metadata-modification date does not change the observation year.

- [Exact API export](https://data.melbourne.vic.gov.au/api/explore/v2.1/catalog/datasets/annual-bike-counts-super-tuesday/exports/json) and [publisher's field metadata](https://data.melbourne.vic.gov.au/api/datasets/1.0/annual-bike-counts-super-tuesday/attachments/super_tuesday_bike_counts_metadata_pdf/).
- [Bicycle Network survey methodology](https://bicyclenetwork.com.au/our-services/transport-surveys-and-data/super-counts/): manual morning commuter counts, 7–9 am for Super Tuesday South.
- Retained the original `site_id`, coordinates and intersection description. Renamed the published `total` to `count_7_9am`. No geocoding, extrapolation or averaging was performed.
- Verified every total against the sum of the eight published 15-minute intervals (7:00 through 8:45 am). All 46 sites have unique IDs, complete coordinates and matching totals. No sites were omitted from 2017.
- Do not interpret these as daily averages or unique commuters across the municipality. A person may pass multiple survey sites. No evening counts or growth rates are shown; the previous unsupported values are no longer used by this map.
- The largest published count is **1,816**, at site **4436**, Flinders / Swanston Street. This is an intersection count, not a Princes Bridge daily total.
- Circle area uses a zero-based linear size scale. In Vega-Lite, symbol `size` is already area; a square-root size scale would not preserve proportional area.
- The background uses the official [Municipal boundary](https://data.melbourne.vic.gov.au/explore/dataset/municipal-boundary/), CC BY 4.0, retrieved 24 October 2026. Ring winding was normalised for Vega/D3; coordinates were preserved. It provides contemporary location context, not a claim about the precise 2017 boundary.

The [source record](bike_counters.source.json) includes URLs, retrieval date, source hash and processing notes. Full original records and API metadata are retained in `data/sources/`; these audit files are not loaded by the page. Run `python scripts/prepare_bike_counts.py` from the project directory to reproduce the CSV from the retained snapshot. Refreshing the export also requires reviewing the chart's year, limits, annotation and narrative before publishing.

## Other datasets

The remaining source organisations are inherited attributions. This update did not verify their underlying figures; the table records the evidence still needed rather than claiming they have been validated.

## Active datasets

| File | Meaning / claimed source | Evidence needed |
|---|---|---|
| `melbourne_lgas.geojson` | 16 council polygons / ABS | Boundary release, download and simplification method; geographic accuracy |
| `melbourne_lga_commute.csv` | Cycling shares, workers and counts / ABS Census 2021 | Exact table, denominator, mode definition and geography coverage |
| `short_trips_mode.csv` | Five mode shares for trips under 5 km / VISTA | Survey year/table, population, weighting and distance definition |
| `cycling_routes.geojson` | Geometry, protection and volume / Victorian DTP | Spatial release, classification method and separate rider-volume source |
| `hourly_volume_patterns.csv` | Day/hour/cyclists / City of Melbourne | Sensor IDs, observation dates, averaging and missing-data handling |
| `commute_trends_area.csv` | Year/mode/daily_trips_k / ABS | Tables, destination geography, denominator, working-from-home and lockdown treatment |
| `safety_perception_likert.csv` | Facility/response/percentage / Bicycle Network | Survey report/page/year, sample size, wording, sampling and categories |
| `trip_purpose_radial.csv` | Purpose/share/annual trips/distance / VISTA | Table/year, Victorian versus Melbourne scope, weighting and annualisation |
| `corridor_gender_split.csv` | Corridor/gender/riders / Super Tuesday | Report/year/site IDs, 7–9 am scope, gender recording method and missing categories |

The waffle generates 100 cells from five percentages: 55 car driver, 17 passenger, 6 public transport, 19 walking and 3 bicycle. These describe supplied values, not independently verified statistics.

## Unused legacy files

`modal_share_waffle.csv`, `lga_rankings_bump.csv` and `gender_age_breakdown.csv` are retained but not loaded. Their documentation must not be used as provenance for the active waffle, spending or corridor charts.

## Source discovery links

- ABS: https://www.abs.gov.au/census
- City of Melbourne: https://data.melbourne.vic.gov.au/
- DataVic / Victorian DTP: https://discover.data.vic.gov.au/
- Bicycle Network: https://www.bicyclenetwork.com.au/

These are organisation links, not dataset-level citations. For the remaining files, record exact URLs, releases/dates, tables/pages, access dates, licences, original fields, filtering and calculations. Retain supporting records and confirm at least two independent data sources.

## Sources by figure

Publisher and collection references are distinguished from verified source records. Each chart caption links here and to its actual local data file.

<a id="figure-1"></a>

### Figure 1: Choropleth

[Source / reference](https://www.abs.gov.au/census/guide-census-data/census-dictionary/2021/variables-topic/transport/method-travel-work-mtwp) · [Chart data](melbourne_lga_commute.csv)

The linked ABS page defines the variable; it does not verify the supplied council percentages or simplified polygons. Exact source tables and boundary files have not been identified.

<a id="figure-2"></a>

### Figure 2: Short-trip waffle

[Source / reference](https://opendata.transport.vic.gov.au/dataset/victorian-integrated-survey-of-travel-and-activity-vista?v=2) · [Chart data](short_trips_mode.csv)

Official VISTA collection reference. The exact release, filters and weighted calculation behind the supplied five percentages have not been identified.

<a id="figure-3"></a>

### Figure 3: Route map

[Source / reference](https://www.vic.gov.au/bicycle-network-planning) · [Chart data](cycling_routes.geojson)

Official network-planning and spatial-data reference. The supplied route geometry, protection classifications and daily rider volumes have not been traced to specific records.

<a id="figure-4"></a>

### Figure 4: Allocation rankings

[Source / reference](https://www.merri-bek.vic.gov.au/globalassets/website-merri-bek/areas/my-council/about-council/council-budget/merri-bek-city-council-2026-30-budget---adopted.pdf#page=104) · [Chart data](merri_bek_transport_budget.csv)

Verified against Appendix B, PDF pages 104–105. Six selected programs; planned allocations for 2026–27 through 2030–31. See the transport dataset processing record above.

<a id="figure-5"></a>

### Figure 5: Allocation treemap

[Source / reference](https://www.merri-bek.vic.gov.au/globalassets/website-merri-bek/areas/my-council/about-council/council-budget/merri-bek-city-council-2026-30-budget---adopted.pdf#page=104) · [Chart data](merri_bek_transport_budget.csv)

Uses the same verified budget rows as Figure 4, summed across five financial years. The selected total is $14,242,654.

<a id="figure-6"></a>

### Figure 6: Survey-site map

[Source / reference](https://data.melbourne.vic.gov.au/explore/dataset/annual-bike-counts-super-tuesday/) · [Chart data](bike_counters.csv)

Verified against the retained official API export: 46 sites in 2017, 7–9 am. The background is the official municipal-boundary dataset. See the Super Tuesday processing record above.

<a id="figure-7"></a>

### Figure 7: Hourly heatmap

[Source / reference](https://data.melbourne.vic.gov.au/) · [Chart data](hourly_volume_patterns.csv)

Publisher homepage only. No specific hourly bicycle dataset, sensor IDs, dates or aggregation process has been established for the supplied values. Super Tuesday morning counts do not substantiate a seven-day, 24-hour heatmap.

<a id="figure-8"></a>

### Figure 8: Mode-share trends

[Source / reference](https://www.abs.gov.au/census/guide-census-data/census-dictionary/2021/variables-topic/transport/method-travel-work-mtwp) · [Chart data](commute_trends_area.csv)

The linked ABS page is a variable guide, not a source table for this time series. The 2001–2021 counts, destination geography and denominators have not been verified.

<a id="figure-9"></a>

### Figure 9: Safety responses

[Source / reference](https://www.bicyclenetwork.com.au/) · [Chart data](safety_perception_likert.csv)

Attributed publisher homepage only. No matching survey report, sample, year or five-category response table has been established. Related safety studies are not evidence for these particular percentages.

<a id="figure-10"></a>

### Figure 10: Trip-purpose coxcomb

[Source / reference](https://opendata.transport.vic.gov.au/dataset/victorian-integrated-survey-of-travel-and-activity-vista?v=2) · [Chart data](trip_purpose_radial.csv)

Official VISTA collection reference. The exact period, population, weighting and source table behind the supplied shares have not been established.

<a id="figure-11"></a>

### Figure 11: Corridor gender counts

[Source / reference](https://data.melbourne.vic.gov.au/explore/dataset/annual-bike-counts-super-tuesday/) · [Chart data](corridor_gender_split.csv)

The official collection includes gender counts, but the supplied corridor rows have not been matched to its site IDs and survey years. Verification of Figure 6 does not verify this separate CSV.
