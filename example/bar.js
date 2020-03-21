/**
 * bar.js
 * simple bar chart library
 * 12.03.2020 - version 1.0
 * {url}
 *
 * Copyright 2020 Katarzyna Skonecka
 * Released under the MIT license
 * {license url}
 *
 * @param targetId
 * @param width
 * @param height
 * @param data
 * @constructor
 *
 *
 **/

'use strict';

function BarChart(targetId, width, height, data) {

    const chart = this;

    //specify configuration
    chart.configureChart(targetId, width, height, data)

    //pre operations
    chart.performPreOperations()

    console.log(chart);

    //drawChart
    chart.drawChart()
}


BarChart.prototype.configureChart = function (targetId, width, height, data) {
    // Base
    const chart = this;

    //global canvas specs
    chart.setCanvasParameters(targetId, width, height, data)

    //Chart specification
    chart.setChartParameters()

}

BarChart.prototype.setCanvasParameters = function (targetId, width, height, data) {
    // Base
    const chart = this;
    // Canvas Global specs come from outside
    chart.id = targetId
    chart.width = width
    chart.height = height
    chart.data = data
}

BarChart.prototype.setChartParameters = function () {

    const chart = this;
    // axis configurations
    chart.axisRatio = 10 // in terms of percentage
    chart.verticalMargin = (chart.height * chart.axisRatio) / 100
    chart.horizontalMargin = (chart.width * chart.axisRatio) / 100
    chart.axisColor = '#b1b1b1'
    chart.axisWidth = 0.75

    // label config
    chart.fontRatio = 3 // in tems of %
    chart.fontFamily = 'times'
    chart.fontStyle = 'normal'
    chart.fontWeight = '300'
    chart.fontColor = '#666666'
    chart.verticalFontSize = (chart.height * chart.fontRatio) / 100
    chart.horizontalFontSize = (chart.width * chart.fontRatio) / 100

    // guideline configuration
    chart.guidelineColor = '#e5e5e5'
    chart.guidelineWidth = 0.5
}

BarChart.prototype.performPreOperations = function () {
    const chart = this;

    chart.createCanvas()

    //get data
    chart.handleData()

    chart.prepareData()

}

BarChart.prototype.createCanvas = function () {
    const chart = this;

    //create canvas

    const canvas = document.createElement('canvas');
    canvas.id = chart.id + '-' + Math.random()
    canvas.width = chart.width
    canvas.height = chart.height

    //append to DOM
    document.getElementById(chart.id).innerHTML = '';
    document.getElementById(chart.id).appendChild(canvas)

    // add canvas to chart object
    chart.canvas = canvas
    chart.context = canvas.getContext('2d')
}

BarChart.prototype.handleData = function () {

    const chart = this;

    //data sets

    chart.labels = []
    chart.values = []

    chart.data.forEach(function (item) {
        chart.labels.push(item.label);
        chart.values.push(item.value);
    });
}

BarChart.prototype.prepareData = function () {
    const chart = this;

    chart.itemsNum = chart.data.length;
    chart.maxValue = Math.max.apply(null, chart.values);
    chart.minValue = Math.min.apply(null, chart.values);

    // Axis Specifications
    chart.verticalAxisWidth = chart.height - 2 * chart.verticalMargin; // bottom and top margins
    chart.horizontalAxisWidth = chart.width - 2 * chart.horizontalMargin // left and right margins

    // Label Specifications
    chart.verticalUpperBound = Math.ceil(chart.maxValue / 10) * 10;
    chart.verticalLabelFreq = chart.verticalUpperBound / chart.itemsNum;
    chart.horizontalLabelFreq = chart.horizontalAxisWidth / chart.itemsNum;

}

BarChart.prototype.drawChart = function () {
    const chart = this;

    //vertical axis
    chart.drawVerticalAxis()

    //horizontal axis
    chart.drawHorizontalAxis()

    //vertical labels
    chart.drawVerticalLabels()

    //horizontal labels
    chart.drawHorizontalLabels()

    //horizontalGuidelines
    chart.drawHorizontalGuidelines()

    //vertical Guidelines
    chart.drawVerticalGuidelines()

    //draw bars
    chart.drawBars()

}

BarChart.prototype.drawVerticalAxis = function () {
    const chart = this;

    // Vertical Axis
    chart.context.beginPath();
    chart.context.strokeStyle = chart.axisColor;
    chart.context.lineWidth = chart.axisWidth;
    chart.context.moveTo(chart.horizontalMargin, chart.verticalMargin);
    chart.context.lineTo(chart.horizontalMargin, chart.height - chart.verticalMargin);
    chart.context.stroke();
}

BarChart.prototype.drawHorizontalAxis = function () {

    const chart = this;

    // Horizontal Axis
    chart.context.beginPath();
    chart.context.strokeStyle = chart.axisColor;
    chart.context.lineWidth = chart.axisWidth;
    chart.context.moveTo(chart.horizontalMargin, chart.height - chart.verticalMargin);
    chart.context.lineTo(chart.width - chart.horizontalMargin, chart.height - chart.verticalMargin);
    chart.context.stroke();


}

BarChart.prototype.drawVerticalLabels = function () {
    const chart = this;

    const labelFont = chart.fontStyle + ' ' + chart.fontWeight + ' ' + chart.verticalFontSize + 'px ' + chart.fontFamily
    chart.context.font = labelFont
    chart.context.textAlign = 'right'
    chart.context.fillStyle = chart.fontColor;

    //scale label frequency
    const scaledVerticalLabelFreq = (chart.verticalAxisWidth / chart.verticalUpperBound) * chart.verticalLabelFreq

    for (let i = 0; i <= chart.itemsNum; i++) {
        const labelText = chart.verticalUpperBound - i * chart.verticalLabelFreq;
        const verticalLabelX = chart.horizontalMargin - chart.horizontalMargin / chart.axisRatio
        const verticalLabelY = chart.verticalMargin + i * scaledVerticalLabelFreq

        chart.context.fillText(labelText, verticalLabelX, verticalLabelY)
    }

}

BarChart.prototype.drawHorizontalLabels = function () {
    const chart = this;

    // Text Specifications
    const labelFont = chart.fontStyle + ' ' + chart.fontWeight + ' ' + chart.verticalFontSize + 'px ' + chart.fontFamily
    chart.context.font = labelFont
    chart.context.textAlign = 'center'
    chart.context.textBaseline = 'top'
    chart.context.fillStyle = chart.fontColor;

    //draw labels
    for (let i = 0; i < chart.itemsNum; i++) {
        const horizontalLabelX = chart.horizontalMargin + i * chart.horizontalLabelFreq + chart.horizontalLabelFreq / 2;
        const horizontalLabelY = chart.height - chart.verticalMargin + chart.verticalMargin / chart.axisRatio;

        chart.context.fillText(chart.labels[i], horizontalLabelX, horizontalLabelY);
    }
}

BarChart.prototype.drawHorizontalGuidelines = function () {
    const chart = this;

    chart.context.strokeStyle = chart.guidelineColor
    chart.context.lineWidth = chart.guidelineWidth

    //scale vertical label frequency
    const scaledVerticalLabelFreq = (chart.verticalAxisWidth / chart.verticalUpperBound) * chart.verticalLabelFreq

    for (let i = 0; i <= chart.itemsNum; i++) {
        const horizontalGuidelineStartX = chart.horizontalMargin
        const horizontalGuidelineStartY = chart.verticalMargin + i * scaledVerticalLabelFreq

        const horizontalGuidelineEndX = chart.horizontalMargin + chart.horizontalAxisWidth
        const horizontalGuidelineEndY = chart.verticalMargin + i * scaledVerticalLabelFreq

        chart.context.beginPath()
        chart.context.moveTo(horizontalGuidelineStartX, horizontalGuidelineStartY)
        chart.context.lineTo(horizontalGuidelineEndX, horizontalGuidelineEndY)
        chart.context.stroke()

    }
}

BarChart.prototype.drawVerticalGuidelines = function () {
    const chart = this;

    chart.context.strokeStyle = chart.guidelineColor
    chart.context.lineWidth = chart.guidelineWidth

    for (let i = 0; i <= chart.itemsNum; i++) {
        const verticalGuidelineStartX = chart.horizontalMargin + i * chart.horizontalLabelFreq;
        const verticalGuidelineStartY = chart.height - chart.verticalMargin;

        const verticalGuidelineEndX = chart.horizontalMargin + i * chart.horizontalLabelFreq
        const verticalGuidelineEndY = chart.verticalMargin

        chart.context.beginPath()
        chart.context.moveTo(verticalGuidelineStartX, verticalGuidelineStartY)
        chart.context.lineTo(verticalGuidelineEndX, verticalGuidelineEndY)
        chart.context.stroke()

    }

}

BarChart.prototype.drawBars = function () {
    const chart = this;

    for(let i = 0; i < chart.itemsNum; i++) {
        chart.context.beginPath()

        const color = chart.createRandomRBGColor()
        const fillOpacity = '0.5'
        const fillColor = 'rgba('+ color.r + ', ' + color.g  + ', ' + color.b + ', ' + fillOpacity +')';
        const borderColor = 'rgba('+ color.r + ', ' + color.g  + ', ' + color.b + ')';

        const barX = chart.horizontalMargin + i * chart.horizontalLabelFreq + chart.horizontalLabelFreq / chart.axisRatio
        const barY = chart.height - chart.verticalMargin
        const barWidth = chart.horizontalLabelFreq - 2 * chart.horizontalLabelFreq / chart.axisRatio
        const barHeight = -1 * chart.verticalAxisWidth * chart.values[i] / chart.maxValue

        chart.context.fillStyle = fillColor
        chart.context.strokeStyle = borderColor

        chart.context.rect(barX, barY, barWidth, barHeight)
        chart.context.stroke()
        chart.context.fill()
    }

}

BarChart.prototype.createRandomRBGColor = function () {
    const red = getRandomInt(0, 257)
    const green = getRandomInt(0, 257)
    const blue = getRandomInt(0, 257)

    return { r: red, g: green, b: blue }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}