// helper function to update chart data on btn interaction
function updateChart(field, type){
    let labels, values;
    if(type == 'dsa'){
        labels = Object.keys(skillData.DSA[field]);
        values = Object.values(skillData.DSA[field]);
        updateDataset(dsa_chart, dsa_skillElement, labels, values, field);
    }
    else{
        labels = Object.keys(skillData[field]);
        values = Object.values(skillData[field]);
        updateDataset(web_chart, web_skillElement, labels, values, field);
    }
}