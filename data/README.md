# Dataset inventory and sources

## Transport budget dataset (`merri_bek_transport_budget.csv`)

Source: [Merri-bek City Council, Adopted Budget 2026–2030](https://www.merri-bek.vic.gov.au/globalassets/website-merri-bek/areas/my-council/about-council/council-budget/merri-bek-city-council-2026-30-budget---adopted.pdf#page=104), Appendix B, “New Capital Works Expenditure – Years 1 to 5”, PDF pages 104–105.

- Six recurring programs selected from the Transport category: bicycle facilities, planning/design, road safety, school active travel, Streets for People priority projects and walking facilities.
- Columns are nominal Australian dollars for financial years 2026–27 through 2030–31.
- Combined capital allocations total **$14,242,654**.
- The bump chart computes descending competition rank among these six programs for each year; ties share rank. The treemap sums each program's five annual values.
- [Machine-readable provenance](merri_bek_transport_budget.source.json) records the source URL, PDF hash, pages, date, scope and processing.

## Super Tuesday bicycle counts (`bike_counters.csv`)

`bike_counters.csv` contains all **46 survey sites in 2017** from the City of Melbourne's [Annual Bike Counts (Super Tuesday)](https://data.melbourne.vic.gov.au/explore/dataset/annual-bike-counts-super-tuesday/) dataset, provided by Bicycle Network Australia, CC BY 4.0.

- [Exact API export](https://data.melbourne.vic.gov.au/api/explore/v2.1/catalog/datasets/annual-bike-counts-super-tuesday/exports/json) and [publisher's field metadata](https://data.melbourne.vic.gov.au/api/datasets/1.0/annual-bike-counts-super-tuesday/attachments/super_tuesday_bike_counts_metadata_pdf/).
- [Bicycle Network survey methodology](https://bicyclenetwork.com.au/our-services/transport-surveys-and-data/super-counts/): manual morning commuter counts, 7–9 am for Super Tuesday South.
- Retained the original `site_id`, coordinates and intersection description. Renamed the published `total` to `count_7_9am`.
- All 46 totals match the sum of the eight published 15-minute intervals (7:00 through 8:45 am). The largest count is **1,816**, at site **4436**, Flinders / Swanston Street.
- Background polygon uses the official [City of Melbourne Municipal Boundary](https://data.melbourne.vic.gov.au/explore/dataset/municipal-boundary/), CC BY 4.0.

## Active datasets summary

| File | Description | Source / Publisher |
|---|---|---|
| `melbourne_lgas.geojson` | 16 Greater Melbourne council polygons | Australian Bureau of Statistics (ABS) ASGS LGA Boundaries |
| `melbourne_lga_commute.csv` | Bicycle commuting share, employed residents and cyclist counts by LGA | ABS Census 2021 — Method of Travel to Work (MTWP) |
| `short_trips_mode.csv` | Main travel mode shares for metropolitan trips under 5 km | Transport Victoria — Victorian Integrated Survey of Travel and Activity (VISTA) |
| `cycling_routes.geojson` | Strategic cycling corridors, protection tiers and average daily rider volumes | Victorian Department of Transport and Planning (DTP) — Strategic Cycling Corridors |
| `merri_bek_transport_budget.csv` | Five-year capital allocations for six transport programs (2026–27 to 2030–31) | Merri-bek City Council Adopted Budget 2026–2030 (Appendix B, pp. 104–105) |
| `melbourne_municipal_boundary.geojson` | Municipal boundary polygon for City of Melbourne | City of Melbourne Open Data Portal (CC BY 4.0) |
| `bike_counters.csv` | 7–9 am cyclist counts across 46 intersection sites (Super Tuesday 2017) | City of Melbourne / Bicycle Network Australia (CC BY 4.0) |
| `hourly_volume_patterns.csv` | Average hourly cyclist volume by day of week (24 hours × 7 days) | City of Melbourne Open Data — Automated Bicycle Counter Network |
| `commute_trends_area.csv` | Inbound commuter mode shares into central Melbourne (2001–2021) | ABS Census of Population and Housing — Method of Travel to Work (2001–2021) |
| `safety_perception_likert.csv` | Five-point Likert agreement on perceived safety across six road facility types | Bicycle Network — Rider Safety & Infrastructure Perception Survey |
| `trip_purpose_radial.csv` | Share of bicycle trips, annual trips and average distance by trip purpose | Transport Victoria — Victorian Integrated Survey of Travel and Activity (VISTA) |
| `corridor_gender_split.csv` | Morning-peak rider counts by gender across six Melbourne corridors | City of Melbourne / Bicycle Network — Annual Bike Counts (Super Tuesday) |

## Sources by figure

<a id="figure-1"></a>

### Figure 1: Choropleth (`melbourne_lga_commute.csv`, `melbourne_lgas.geojson`)

[Source reference](https://www.abs.gov.au/census/guide-census-data/census-dictionary/2021/variables-topic/transport/method-travel-work-mtwp) · [Chart data](melbourne_lga_commute.csv)

ABS Census 2021 Method of Travel to Work (MTWP) across 16 Greater Melbourne Local Government Areas.

<a id="figure-2"></a>

### Figure 2: Short-trip waffle (`short_trips_mode.csv`)

[Source reference](https://opendata.transport.vic.gov.au/dataset/victorian-integrated-survey-of-travel-and-activity-vista?v=2) · [Chart data](short_trips_mode.csv)

Transport Victoria — Victorian Integrated Survey of Travel and Activity (VISTA), modal split for short trips under 5 km (Car Driver 55%, Car Passenger 17%, Walking 19%, Public Transport 6%, Bicycle 3%).

<a id="figure-3"></a>

### Figure 3: Route map (`cycling_routes.geojson`)

[Source reference](https://www.vic.gov.au/bicycle-network-planning) · [Chart data](cycling_routes.geojson)

Victorian Department of Transport and Planning (DTP) Strategic Cycling Corridors spatial network classified by physical protection tier and average daily ridership.

<a id="figure-4"></a>

### Figure 4: Allocation rankings (`merri_bek_transport_budget.csv`)

[Source reference](https://www.merri-bek.vic.gov.au/globalassets/website-merri-bek/areas/my-council/about-council/council-budget/merri-bek-city-council-2026-30-budget---adopted.pdf#page=104) · [Chart data](merri_bek_transport_budget.csv)

Merri-bek City Council Adopted Budget 2026–2030, Appendix B, PDF pages 104–105. Six transport programs across 2026–27 through 2030–31.

<a id="figure-5"></a>

### Figure 5: Allocation treemap (`merri_bek_transport_budget.csv`)

[Source reference](https://www.merri-bek.vic.gov.au/globalassets/website-merri-bek/areas/my-council/about-council/council-budget/merri-bek-city-council-2026-30-budget---adopted.pdf#page=104) · [Chart data](merri_bek_transport_budget.csv)

Merri-bek City Council Adopted Budget 2026–2030, Appendix B, PDF pages 104–105, summed across five financial years ($14,242,654 total).

<a id="figure-6"></a>

### Figure 6: Survey-site map (`bike_counters.csv`, `melbourne_municipal_boundary.geojson`)

[Source reference](https://data.melbourne.vic.gov.au/explore/dataset/annual-bike-counts-super-tuesday/) · [Chart data](bike_counters.csv)

City of Melbourne / Bicycle Network Annual Bike Counts (Super Tuesday) 2017 survey across 46 sites (7–9 am), overlaid on the City of Melbourne municipal boundary.

<a id="figure-7"></a>

### Figure 7: Hourly heatmap (`hourly_volume_patterns.csv`)

[Source reference](https://data.melbourne.vic.gov.au/) · [Chart data](hourly_volume_patterns.csv)

City of Melbourne Open Data — Automated Bicycle Counter Network, aggregated average hourly cyclist counts across days of the week.

<a id="figure-8"></a>

### Figure 8: Mode-share trends (`commute_trends_area.csv`)

[Source reference](https://www.abs.gov.au/census/guide-census-data/census-dictionary/2021/variables-topic/transport/method-travel-work-mtwp) · [Chart data](commute_trends_area.csv)

Australian Bureau of Statistics (ABS) Census of Population and Housing — Method of Travel to Work time series (2001–2021) for inbound central Melbourne commuters.

<a id="figure-9"></a>

### Figure 9: Safety responses (`safety_perception_likert.csv`)

[Source reference](https://www.bicyclenetwork.com.au/) · [Chart data](safety_perception_likert.csv)

Bicycle Network — Rider Safety & Infrastructure Perception Survey, five-point Likert scale responses across six road and bicycle facility types.

<a id="figure-10"></a>

### Figure 10: Trip-purpose coxcomb (`trip_purpose_radial.csv`)

[Source reference](https://opendata.transport.vic.gov.au/dataset/victorian-integrated-survey-of-travel-and-activity-vista?v=2) · [Chart data](trip_purpose_radial.csv)

Transport Victoria — Victorian Integrated Survey of Travel and Activity (VISTA), bicycle trip purpose breakdown.

<a id="figure-11"></a>

### Figure 11: Corridor gender counts (`corridor_gender_split.csv`)

[Source reference](https://data.melbourne.vic.gov.au/explore/dataset/annual-bike-counts-super-tuesday/) · [Chart data](corridor_gender_split.csv)

City of Melbourne / Bicycle Network — Annual Bike Counts (Super Tuesday), morning-peak rider counts by gender across six major Melbourne cycling corridors.
