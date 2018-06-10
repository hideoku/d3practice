import * as d3 from 'd3';
import { HierarchyNode, HierarchyRectangularNode, hierarchy, color, RGBColor } from 'd3';

d3sample();

function d3sample() {
    const width = 960;
    const height = 500;

    const x = d3.scaleLinear().range([0, width]);
    const y = d3.scaleLinear().range([0, height]);

    const svg = d3.select('#output').append('svg')
        .attr('width', width)
        .attr('height', height);
    
    const partition = d3.partition()
        .size([width, height])
        .padding(0)
        .round(true);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    let rect: any;

    d3.json('readme.json').then(root => {
        console.log(root);

        const rootNode = d3.hierarchy(d3.entries(root)[0], d => {
            return d3.entries(d.value);
        })
        .sum(d => d.value)
        .sort((a, b) => { return Number(b.value) - Number(a.value); });

        console.log(rootNode.descendants());

        partition(rootNode);

        rect = svg.selectAll('rect')
            .data(rootNode.descendants())
            .enter()
            .append('rect')
            .attr('x', d => (d as HierarchyRectangularNode<any>).x0)
            .attr('y', d => (d as HierarchyRectangularNode<any>).y0)
            .attr('width', d => {
                const dNode = d as HierarchyRectangularNode<any>;
                return dNode.x1 - dNode.x0;
            })
            .attr('height', d => {
                const dNode = d as HierarchyRectangularNode<any>;
                return dNode.y1 - dNode.y0;
            })
            .attr('fill', d => {
                const dNode = d as HierarchyRectangularNode<any>;
                let rgbColor: any;
                if (dNode.children) {
                    return color(d.data.key);
                } else if (d.parent) {
                    return color(d.parent.data.key);
                } else {
                    return color(d.data.key);
                }
            })
            .on('click', clicked);
    });

    function clicked(d: any): any {
        x.domain([d.x0, d.x1]);
        y.domain([d.y0, height]).range([d.depth ? 20 : 0, height]);

        rect.transition()
            .duration(750)
            .attr('x', (d: any) => x(d.x0))
            .attr('y', (d: any) => y(d.y0))
            .attr('width', (d: any) => x(d.x1) - x(d.x0))
            .attr('height', (d: any) => y(d.y1) - y(d.y0));
    }
}




// npm insatll d3 --save
// npm install @types/d3 --save