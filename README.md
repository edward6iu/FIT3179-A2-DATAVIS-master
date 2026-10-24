# Pedalling Ahead: Melbourne’s Cycling Commute Landscape

FIT3179 Data Visualisation 2 · Yuxiang Liu · 3311 6091

A single scrolling page for an Australian general audience. Four sections explain the commuter footprint, infrastructure, counter flow patterns, and safety/participation.

## Chart inventory and rationale

| Section | Chart | Purpose |
|---|---|---|
| Footprint | Choropleth | Compare council cycling shares |
| Footprint | Waffle | Show travel modes for trips under 5 km |
| Network | Route map | Compare corridor protection levels |
| Network | Bump | Compare planned allocation ranks across six Merri-bek transport programs, 2026–27 to 2030–31 |
| Network | Treemap | Show the five-year allocation sizes for those six programs |
| Flows | Proportional-symbol map | Compare 7–9 am counts at 46 official Super Tuesday sites in 2017 |
| Flows | Heatmap | Identify hourly and weekly patterns |
| Flows | 100% stacked area | Compare commuting mode composition over time |
| Safety | Diverging Likert bars | Compare safety responses |
| Safety | Equal-angle coxcomb | Compare purpose shares by wedge area |
| Safety | Grouped bars | Compare gender counts at selected corridors |

There are 11 charts and three distinct map idioms. Maps, waffle, bump, heatmap, coxcomb and treemap provide eight intended advanced idioms. Diverging stacked bars, grouped bars and stacked area are conservatively treated as basic. Final classification and effectiveness are assessed by the tutor; this is not a grade guarantee.

## Implementation

Ten readable JSON specifications use Vega-Lite v5; the treemap uses Vega v5 hierarchy transforms. Shared chart typography uses Inter and Space Grotesk through `js/main.js`. The coxcomb has equal angles, zero inner radius, and a square-root radial scale starting at zero: wedge area is proportional to percentage. The treemap sums five annual allocations for each selected Merri-bek program. Colour assignments match the bump chart.

Titles wrap to their initial column width, charts resize with their containers, and document overflow is not hidden. Hover details and filtering support the presentation without swapping major sections.

## Data sources

The two allocation charts use Merri-bek City Council's adopted 2026–2030 budget, Appendix B, PDF pages 104–105. The 30 annual amounts were transcribed and checked against the source table, including its five-year totals. They are plans for six selected programs, not actual expenditure, all transport spending, or a cycling-only total. Equal amounts share rank. The original unsupported cross-council spending series is no longer used.

Figure 6 uses the City of Melbourne / Bicycle Network Annual Bike Counts (Super Tuesday) export. All 46 sites in 2017 are included, with original site IDs and coordinates; each published total matches its eight morning intervals. The public export ends in 2017, so the map is explicitly historical. No daily averages, evening peaks or inferred growth rates are shown. The map background is the council's official municipal boundary. Sources are linked in the caption and footer.

See [data/README.md](data/README.md) for the exact sources, inventory and processing details. These source checks cover the replacement allocation data and Figure 6's survey/boundary data; they do not establish provenance for the other datasets inherited from the project. The counter CSV can be rebuilt with `python scripts/prepare_bike_counts.py` using the retained original API export.

## Preview and submission

From this directory run `python -m http.server 8000` and open http://localhost:8000. Internet is required for CDN libraries and fonts.

- Check all 11 charts and interactions on the public GitHub Pages deployment and a small laptop screen.
- Submit the actual hand-drawn A4 sketch as a PDF; it should correspond to the four-section layout. No sketch is supplied here.
- Complete the Moodle template with domain, audience, purpose, sources/creation process and What/Why/How rationale.
- Ensure AI acknowledgement reflects all assistance and prepare for the interview.

Repository: https://github.com/edward6iu/FIT3179-A2-DATAVIS-master

Local edits do not automatically update the live deployment.
