// STEP 1: Make dropdown menu that will display id
d3.json("samples.json").then((data) => {
    var id = data.names;
    console.log(id);
    var names=d3.selectAll("#selDataset");
    Object.entries(id).forEach(([key,value]) => {
        names.append("option").text(value);
    });
});
// STEP 2: Make demographic info panel
d3.json("samples.json").then((data) => {
    var demographic= data.metadata;
    console.log(demographic);
    var info_panel=d3.select("#sample-metadata");
    info_panel.html("");
    Object.entries(demographic).forEach(([key,value]) => {
        info_panel.append("h3").text();
    });
});