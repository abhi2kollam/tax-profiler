const csv = require('csv-parser');
const fs = require('fs');

const values = [];

fs.createReadStream('data.csv')
    .pipe(csv())
    .on('data', (row) => {
        values.push(Object.values(row));
    })
    .on('end', () => {
        var clustering = require('density-clustering');
        var dbscan = new clustering.DBSCAN();
        var clusters = dbscan.run(values, 2, 1);
        console.log(clusters, dbscan.noise);
        values.push([1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0])
        var dbscan = new clustering.DBSCAN();
        var clusters = dbscan.run(values, 2, 1);
        console.log(clusters, dbscan.noise);
    });

// var dataset = [
//     [1, 1], [0, 1], [1, 0],
//     [10, 10], [10, 13], [13, 13],
//     [54, 54], [55, 55], [89, 89], [57, 55]
// ];

// var clustering = require('density-clustering');
// var dbscan = new clustering.DBSCAN();
// // parameters: 5 - neighborhood radius, 2 - number of points in neighborhood to form a cluster
// var clusters = dbscan.run(dataset, 5, 2);
// console.log(clusters, dbscan.noise);