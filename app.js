// STEP 1: Make dropdown menu that will display id
var json_data;
d3.json("samples.json").then((data) => {
    var id = data.names;
    json_data=data;
    console.log(id);
    console.log(data.metadata);
    var input_id=d3.selectAll("#selDataset");
    Object.entries(id).forEach(([key,value]) => {
        input_id.append("option").text(value);
    });
    optionChanged(id[0]);
});
// STEP 2: Make demographic info panel
function metadata(id) {
// d3.json("samples.json").then((data) => {
    // var id ="940";
    var demographic= json_data.metadata;
    console.log(demographic);
    var info_panel=d3.select("#sample-metadata");
    info_panel.html("");
    filteredDemog=demographic.filter(x => x.id == id)[0];
    console.log(filteredDemog);
    Object.entries(filteredDemog).forEach(([key,value]) => {
        info_panel.append("h5").text(`${key}:${value}`);
    });
    //Gauge
    var data = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: filteredDemog.wfreq,
          title: { text: "Speed" },
          type: "indicator",
          mode: "gauge+number+delta",
          delta: { reference: 9 },
          gauge: {
            axis: { range: [null, 9] },
            steps: [
              { range: [0, 4], color: "lightgray" },
              { range: [4, 9], color: "gray" }
            ],
            // threshold: {
            //   line: { color: "red", width: 4 },
            //   thickness: 0.75,
            //   value: 490
            // }
          }
        }
      ];
      
      var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
      Plotly.newPlot('gauge', data, layout);

};

//STEP3: Making Plots (horiz. bar and bubble charts)
function graphs(id){
// d3.json("samples.json").then((data) => {
    //Sort the data
    // var id= "940";
    var sample_data=json_data.samples;
    filteredSamples=sample_data.filter(x => x.id == id)[0];
    //var sortValues=data.sort((a, b) => b.sample_values - a.sample_values);
    // Slice the first 10 objects for plottin
    filtered_otu_id = filteredSamples.otu_ids;
    filtered_sample_value = filteredSamples.sample_values;
    filtered_otu_label = filteredSamples.otu_labels;
    
    // Trace1 for the Greek Data
    var trace1 = {
    // Get the 1st ten in reverse order
    x: filtered_sample_value.slice(0, 10).reverse(),
    y: filtered_otu_id.slice(0, 10).reverse().map(x=>`OTU:${x}`),
    text: filtered_otu_label.slice(0, 10).reverse(),
    name: "OTU",
    type: "bar",
    orientation: "h"
    };
    // data
    var bar_data = [trace1];
    // Apply the group bar mode to the layout
    var bar_layout = {
    title: "Highest 10 OTU",
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }
    };
    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bar", bar_data, bar_layout)


    var trace2 = {
        x: filtered_otu_id,
        y: filtered_sample_value,
        text: filtered_otu_label,
        mode: 'markers',
        marker: {
          color: filtered_otu_id,
          size: filtered_sample_value
        }
      };
      
      var bubble_data = [trace2];
      
      var bubble_layout = {
        title: 'Marker Size and Color',
        showlegend: false
      };
      
      Plotly.newPlot('bubble', bubble_data, bubble_layout);

};
function optionChanged (new_id){
    metadata(new_id);
    graphs(new_id);
};
