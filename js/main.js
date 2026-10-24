/**
 * FIT3179 Data Visualisation 2 - Cycling for Transport in Greater Melbourne
 * Master Embedding Script: Responsive Vega-Embed Configuration & Initialization
 */

document.addEventListener("DOMContentLoaded", () => {
  console.log("Initializing FIT3179 Cycling Visualisation Suite...");

  // Default Vega-Embed Configuration Options
  const embedOptions = {
    actions: {
      export: true,
      source: false,
      compiled: false,
      editor: false
    },
    renderer: "svg",
    config: {
      font: "Inter",
      title: { font: "Space Grotesk", subtitleFont: "Inter", anchor: "start", fontSize: 16, subtitleFontSize: 11 },
      axis: { labelFont: "Inter", titleFont: "Inter", labelFontSize: 11 },
      legend: { labelFont: "Inter", titleFont: "Inter" },
      text: { font: "Inter" },
      view: { stroke: null }
    },
    scaleFactor: 2
  };

  // Chart Registry: 11 visualisations including three map idioms; classification is explained in README.md
  // IDs strictly aligned with index.html container elements
  const chartRegistry = [
    { id: "#chart-treemap", spec: "json/chart_treemap_investment.json", name: "Treemap: Merri-bek transport allocations" },
    {
      id: "#map-choropleth",
      spec: "json/map_choropleth_commute.json",
      name: "Choropleth Map: Commute by LGA (Advanced Idiom 1)"
    },
    {
      id: "#chart-waffle",
      spec: "json/chart_waffle_modal_share.json",
      name: "10x10 Unit Waffle Chart: Short-Trip Modal Share (Advanced Idiom 2)"
    },
    {
      id: "#map-routes",
      spec: "json/map_routes_infrastructure.json",
      name: "Route Map: Strategic Cycling Corridors (Advanced Idiom 3)"
    },
    {
      id: "#chart-bump",
      spec: "json/chart_bump_lga_rankings.json",
      name: "Bump Chart: Merri-bek Transport Program Allocation Ranks"
    },
    {
      id: "#map-symbols",
      spec: "json/map_symbols_counters.json",
      name: "Proportional Symbol Map: Super Tuesday 2017 Morning Counts"
    },
    {
      id: "#chart-heatmap",
      spec: "json/chart_heatmap_hourly_volume.json",
      name: "2D Matrix Heatmap: Diurnal Cyclist Flow Rhythms (Advanced Idiom 6)"
    },
    {
      id: "#chart-stacked-area",
      spec: "json/chart_stacked_area_trends.json",
      name: "Stacked Area Chart: Long-Term Cordon Mode Shift (Comparative Trend 1)"
    },
    {
      id: "#chart-diverging",
      spec: "json/chart_diverging_safety_sentiment.json",
      name: "Diverging Likert Bar: Perceived Infrastructure Safety (Advanced Idiom 7)"
    },
    {
      id: "#chart-radial",
      spec: "json/chart_radial_purpose.json",
      name: "Radial Coxcomb Chart: Trip Purpose Breakdown (Advanced Idiom 8)"
    },
    {
      id: "#chart-grouped-bar",
      spec: "json/chart_grouped_bar_gender.json",
      name: "Grouped Bar Chart: Corridor Gender Split (Comparative Trend 2)"
    }
  ];

  // Embed Each Specification Asynchronously with Error Boundaries
  let loadedCount = 0;

  chartRegistry.forEach(({ id, spec, name }) => {
    const targetElement = document.querySelector(id);
    if (!targetElement) {
      console.warn(`[VegaEmbed] Target container ${id} not found in DOM.`);
      return;
    }

    // Wrap titles for the available column width, including narrow laptop columns.
    const wrap = (text, count) => String(text).split(/\s+/).reduce((lines, word) => {
      if (!lines.length || lines[lines.length - 1].length + word.length + 1 > count) lines.push(word);
      else lines[lines.length - 1] += " " + word;
      return lines;
    }, []);
    const available = Math.max(200, targetElement.clientWidth - 16);
    fetch(spec, { cache: "no-store" }).then(response => {
      if (!response.ok) throw new Error(`Cannot load ${spec}: ${response.status}`);
      return response.json();
    }).then(chart => {
      const lite = chart.$schema.includes("vega-lite");
      if (lite) chart.autosize = { type: "fit-x", contains: "padding", resize: true };
      else {
        chart.width = available;
        chart.autosize = { type: "fit-x", contains: "padding", resize: true };
      }
      if (chart.title && typeof chart.title === "object") {
        chart.title.text = wrap(chart.title.text, Math.max(22, Math.floor(available / 9)));
        if (chart.title.subtitle) chart.title.subtitle = [].concat(chart.title.subtitle).flatMap(line => wrap(line, Math.max(28, Math.floor(available / 6))));
      }
      return vegaEmbed(id, chart, embedOptions);
    })
      .then((result) => {
        const resize = new ResizeObserver(() => {
          if (id === "#chart-treemap") result.view.width(Math.max(200, targetElement.clientWidth - 16));
          result.view.resize().runAsync();
        });
        resize.observe(targetElement);
        loadedCount++;
        console.log(`[VegaEmbed Success] ${name} mounted at ${id} (${loadedCount}/${chartRegistry.length})`);
      })
      .catch((error) => {
        console.error(`[VegaEmbed Error] Failed to render ${name} from ${spec}:`, error);
        targetElement.innerHTML = `
          <div style="padding: 1.5rem; text-align: center; background: #fee2e2; border: 1px solid #ef4444; border-radius: 8px; color: #991b1b; font-family: sans-serif;">
            <p><strong>Failed to render visualisation:</strong> ${name}</p>
            <p style="font-size: 0.85rem; color: #b91c1c;">Specification path: <code>${spec}</code></p>
            <p style="font-size: 0.8rem; font-style: italic;">Make sure you are serving this project via a local web server (e.g. <code>python -m http.server</code>) or GitHub Pages.</p>
          </div>
        `;
      });
  });

  // Sticky Navigation Active State (ScrollSpy)
  const navLinks = document.querySelectorAll(".section-nav a");
  const sections = document.querySelectorAll("section.story-section");

  if ("IntersectionObserver" in window && sections.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinks.forEach((link) => {
              if (link.getAttribute("href") === `#${id}`) {
                link.classList.add("active");
              } else {
                link.classList.remove("active");
              }
            });
          }
        });
      },
      {
        rootMargin: "-20% 0px -65% 0px"
      }
    );

    sections.forEach((sec) => observer.observe(sec));
  }
});
