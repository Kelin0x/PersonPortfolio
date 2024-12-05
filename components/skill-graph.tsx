"use client";

import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { skillData } from './skill-graph-data';

interface Skill extends d3.SimulationNodeDatum {
    id: string;
    name: string;
    level: number;
    category: string;
}

interface Link extends d3.SimulationLinkDatum<Skill> {
    source: string;
    target: string;
    strength: number;
}

interface Node extends d3.SimulationNodeDatum {
    x: number;
    y: number;
}

export const SkillGraph = () => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // 初始化尺寸
        setDimensions({
            width: window.innerWidth * 0.5,
            height: window.innerHeight * 0.5
        });

        // 添加窗口大小变化监听
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth * 0.45,
                height: window.innerHeight * 0.5
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!isMounted || !svgRef.current || dimensions.width === 0) return;

        // 使用 dimensions 状态而不是直接访问 window
        const { width, height } = dimensions;

        // 清除现有内容
        d3.select(svgRef.current).selectAll("*").remove();

        // 添加边界约束
        const padding = 5; // 设置边距，防止节点太靠近边缘

        // 配色方案
        const categoryColors = {
            core: '#ff6b6b',
            frontend: '#4ecdc4',
            backend: '#45b7d1',
            web3: '#96f2d7',
            devtools: '#ffd93d'
        };

        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .attr('viewBox', [-width / 2, -height / 2, width, height]);

        // 修改力导向图配置
        const simulation = d3.forceSimulation<Skill>()
            .force('link', d3.forceLink<Skill, Link>()
                .id(d => d.id)
                .distance(150)
                .strength(0.8)
            )
            .force('charge', d3.forceManyBody()
                .strength(-400)
                .distanceMax(300)
            )
            .force('collision', d3.forceCollide().radius(60))
            .force('x', d3.forceX().strength(0.08))
            .force('y', d3.forceY().strength(0.08))
            .force('center', d3.forceCenter(0, 0));

        // 创建连接线
        const link = svg.append('g')
            .selectAll('line')
            .data(skillData.links)
            .join('line')
            .attr('stroke', '#999')
            .attr('stroke-opacity', 0.6)
            .attr('stroke-width', d => d.strength * 1.5)
            .attr('stroke-dasharray', '4,4');

        // 创建节点组
        const node = svg.append('g')
            .selectAll('g')
            .data(skillData.skills)
            .join('g')
            .call(d3.drag<SVGGElement, Skill>()
                .on('start', dragstarted)
                .on('drag', dragged)
                .on('end', dragended));

        // 添加节点圆圈
        node.append('circle')
            .attr('r', d => d.level * 7)
            .attr('fill', d => categoryColors[d.category as keyof typeof categoryColors])
            .attr('stroke', '#fff')
            .attr('stroke-width', 5);

        // 添加节点文本
        node.append('text')
            .text(d => d.name)
            .attr('x', 0)
            .attr('y', d => d.level * 4 + 10)
            .attr('text-anchor', 'middle')
            .attr('fill', '#4a5568')
            .attr('font-size', '20px');

        // 添加悬浮效果
        node.on('mouseover', function (event, d) {
            // 高亮相关连接和节点
            link
                .attr('stroke-opacity', l =>
                    (l.source === d || l.target === d) ? 1 : 0.1);
            node.attr('opacity', n =>
                n === d || skillData.links.some(l =>
                    (l.source === d.id && l.target === n.id) ||
                    (l.target === d.id && l.source === n.id)
                ) ? 1 : 0.2);
        })
            .on('mouseout', function () {
                link.attr('stroke-opacity', 0.6);
                node.attr('opacity', 1);
            });

        function dragstarted(event: d3.D3DragEvent<SVGGElement, Skill, Skill>) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }

        function dragged(event: d3.D3DragEvent<SVGGElement, Skill, Skill>) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }

        function dragended(event: d3.D3DragEvent<SVGGElement, Skill, Skill>) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }

        simulation
            .nodes(skillData.skills)
            .on('tick', () => {
                // 添加边界限制
                node.each((d: Node) => {
                    d.x = Math.max(-width/2 + padding, Math.min(width/2 - padding, d.x));
                    d.y = Math.max(-height/2 + padding, Math.min(height/2 - padding, d.y));
                });

                link
                    .attr('x1', d => (d.source as Skill).x!)
                    .attr('y1', d => (d.source as Skill).y!)
                    .attr('x2', d => (d.target as Skill).x!)
                    .attr('y2', d => (d.target as Skill).y!);

                node.attr('transform', d => `translate(${d.x},${d.y})`);
            });

        simulation.force<d3.ForceLink<Skill, Link>>('link')!
            .links(skillData.links);

        return () => {
            simulation.stop();
        };
    }, [isMounted, dimensions]);

    return (
        <div className="w-full aspect-square flex items-center justify-center 
          bg-white/50 backdrop-blur-sm rounded-3xl shadow-lg p-2">
            <svg ref={svgRef} className="w-full h-full" />
        </div>
    );
};