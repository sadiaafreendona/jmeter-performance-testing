/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 57.06666666666667, "KoPercent": 42.93333333333333};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.0, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0, 500, 1500, "https://www.banglapuzzle.com/career"], "isController": false}, {"data": [0.0, 500, 1500, "Test"], "isController": true}, {"data": [0.0, 500, 1500, "https://www.banglapuzzle.com/"], "isController": false}, {"data": [0.0, 500, 1500, "https://www.banglapuzzle.com/products"], "isController": false}, {"data": [0.0, 500, 1500, "https://www.banglapuzzle.com/services"], "isController": false}, {"data": [0.0, 500, 1500, "https://www.banglapuzzle.com/contact"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 1500, 644, 42.93333333333333, 83748.97533333325, 5989, 103746, 93467.5, 100763.8, 103010.95, 103421.69, 2.8272920385341056, 165.3115851059669, 2.630817330075036], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["https://www.banglapuzzle.com/career", 300, 70, 23.333333333333332, 91205.02333333335, 13966, 101757, 90889.0, 100472.8, 100616.7, 100743.82, 1.4702062699396725, 49.79305315285735, 1.5422808351261683], "isController": false}, {"data": ["Test", 300, 300, 100.0, 418744.88, 338302, 475004, 414578.5, 468616.7, 472682.35, 474917.35, 0.6313436887728152, 184.5731260075193, 2.937351173878365], "isController": true}, {"data": ["https://www.banglapuzzle.com/", 300, 120, 40.0, 75868.40333333338, 15308, 103746, 87317.0, 103302.4, 103367.8, 103470.87, 2.8915383948106523, 327.1268450876377, 1.4372978935142793], "isController": false}, {"data": ["https://www.banglapuzzle.com/products", 300, 298, 99.33333333333333, 99509.30000000009, 44161, 103644, 100430.0, 100721.8, 102143.1, 103245.04000000001, 1.396856142442077, 1.987532586034698, 1.531630934310512], "isController": false}, {"data": ["https://www.banglapuzzle.com/services", 300, 86, 28.666666666666668, 62705.72666666664, 5989, 103253, 62826.5, 100429.0, 100667.55, 100961.66, 1.5920102313190865, 114.76404273253962, 1.7456143434815141], "isController": false}, {"data": ["https://www.banglapuzzle.com/contact", 300, 70, 23.333333333333332, 89456.42333333331, 64226, 103434, 93284.5, 100570.9, 100594.95, 100735.78, 1.5677503305340281, 112.62528019454476, 1.4321031827944628], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["503/Service Unavailable", 104, 16.149068322981368, 6.933333333333334], "isController": false}, {"data": ["502/Bad Gateway", 9, 1.3975155279503106, 0.6], "isController": false}, {"data": ["524", 530, 82.29813664596273, 35.333333333333336], "isController": false}, {"data": ["500/Internal Server Error", 1, 0.15527950310559005, 0.06666666666666667], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 1500, 644, "524", 530, "503/Service Unavailable", 104, "502/Bad Gateway", 9, "500/Internal Server Error", 1, "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["https://www.banglapuzzle.com/career", 300, 70, "524", 48, "503/Service Unavailable", 20, "502/Bad Gateway", 2, "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["https://www.banglapuzzle.com/", 300, 120, "524", 120, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["https://www.banglapuzzle.com/products", 300, 298, "524", 250, "503/Service Unavailable", 43, "502/Bad Gateway", 5, "", "", "", ""], "isController": false}, {"data": ["https://www.banglapuzzle.com/services", 300, 86, "524", 43, "503/Service Unavailable", 40, "502/Bad Gateway", 2, "500/Internal Server Error", 1, "", ""], "isController": false}, {"data": ["https://www.banglapuzzle.com/contact", 300, 70, "524", 69, "503/Service Unavailable", 1, "", "", "", "", "", ""], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
