
window.onload = function() {

    const min = 1
    const max = 200


//chart data

    const data = [
        {
            label: 'Jan',
            value: getRandomInt(min, max)
        }, {
            label: 'Feb',
            value: getRandomInt(min, max)
        }, {
            label: 'March',
            value: getRandomInt(min, max)
        }, {
            label: 'April',
            value: getRandomInt(min, max)
        }, {
            label: 'May',
            value:  getRandomInt(min, max)
        }
    ]

    const targetId = 'chart'
    const canvasWidth = 600
    const canvasHeight = 450

    const chart = new BarChart(targetId, canvasWidth, canvasHeight, data)




    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

}

