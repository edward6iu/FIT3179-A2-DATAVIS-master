Repository: [https://github.com/edward6iu/FIT3179-A2-DATAVIS-master](https://github.com/edward6iu/FIT3179-A2-DATAVIS-master)

Website: [https://edward6iu.github.io/FIT3179-A2-DATAVIS-master/](https://edward6iu.github.io/FIT3179-A2-DATAVIS-master/)

# Pedalling Ahead: Melbourne’s Cycling Commute Landscape

FIT3179 Data Visualisation 2 · Yuxiang Liu · 3311 6091

A single scrolling page for an Australian general audience. Four sections explain the commuter footprint, infrastructure, counter flow patterns, and safety/participation.

## Chart inventory and rationale

| Section | Chart | Purpose |
|---|---|---|
| Footprint | Choropleth | Compare council cycling shares |
| Footprint | Waffle | Show travel modes for trips under 5 km |
| Network | Route map | Compare corridor protection levels |
| Network | Bump | Compare capital allocation ranks across six Merri-bek transport programs, 2026–27 to 2030–31 |
| Network | Treemap | Show the five-year allocation sizes for those six programs |
| Flows | Proportional-symbol map | Compare 7–9 am counts at 46 official Super Tuesday sites |
| Flows | Heatmap | Identify hourly and weekly patterns |
| Flows | 100% stacked area | Compare commuting mode composition over time |
| Safety | Diverging Likert bars | Compare safety responses |
| Safety | Equal-angle coxcomb | Compare purpose shares by wedge area |
| Safety | Grouped bars | Compare gender counts at selected corridors |

There are 11 charts and three distinct map idioms. Maps, waffle, bump, heatmap, coxcomb and treemap provide eight advanced idioms, complemented by diverging stacked bars, grouped bars and stacked area charts.

## Implementation

Ten readable JSON specifications use Vega-Lite v5; the treemap uses Vega v5 hierarchy transforms. Shared chart typography uses Inter and Space Grotesk through `js/main.js`. The coxcomb has equal angles, zero inner radius, and a square-root radial scale starting at zero: wedge area is proportional to percentage. The treemap sums five annual allocations for each selected Merri-bek program. Colour assignments match the bump chart.

Titles wrap to their initial column width, charts resize with their containers, and document overflow is not hidden. Hover details and filtering support the presentation without swapping major sections.

## Data sources

The two allocation charts use Merri-bek City Council's adopted 2026–2030 budget, Appendix B, PDF pages 104–105. All 30 annual amounts were transcribed from the official budget table and summed across the five-year capital works schedule.

Figure 6 uses the City of Melbourne / Bicycle Network Annual Bike Counts (Super Tuesday) export across 46 surveyed intersections, overlaid on the City of Melbourne official municipal boundary. Sources for all 11 figures are linked in each caption, the page footer, and [data/README.md](data/README.md).
