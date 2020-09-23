// STEP 1: Make dropdown menu that will display id
d3.json("samples.json").then((data) => {
    var id = data.names;
    console.log(id);
    console.log(data.metadata);
    var input_id=d3.selectAll("#selDataset");
    Object.entries(id).forEach(([key,value]) => {
        input_id.append("option").text(value);
    });
});
// STEP 2: Make demographic info panel
// function id
d3.json("samples.json").then((data) => {
    var id ="940";
    var demographic= data.metadata;
    console.log(demographic);
    var info_panel=d3.select("#sample-metadata");
    info_panel.html("");
    filteredDemog=demographic.filter(x => x.id == id)[0];
    console.log(filteredDemog);
    Object.entries(filteredDemog).forEach(([key,value]) => {
        info_panel.append("h5").text(`${key}:${value}`);
    });
});

//STEP3: Making Plots (horiz. bar and bubble charts)
d3.json("samples.json").then((data) => {
    //Sort the data
    var id= "940";
    var sample_data=data.samples;
    filteredSamples=sample_data.filter(x => x.id == id)[0];
    //var sortValues=data.sort((a, b) => b.sample_values - a.sample_values);
    // Slice the first 10 objects for plottin
    filtered_otu_id = filteredSamples.otu_ids.slice(0, 10).reverse();
    filtered_sample_value = filteredSamples.sample_values.slice(0, 10).reverse();
    filtered_otu_label = filteredSamples.otu_labels.slice(0, 10).reverse();
    
    // Trace1 for the Greek Data
    var trace1 = {
    x: filtered_sample_value,
    y: filtered_otu_id.map(x=>`OTU:${x}`),
    text: filtered_otu_label,
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
});
