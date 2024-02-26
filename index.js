const expenses = {
    "2023-01": {
        "01": {
            "food": [ 22.11, 43, 11.72, 2.2, 36.29, 2.5, 19 ],
            "fuel": [ 210.22 ]
        },
        "09": {
            "food": [ 11.9 ],
            "fuel": [ 190.22 ]
        }
    },
    "2023-03": {
        "07": {
            "food": [ 20, 11.9, 30.20, 11.9 ]
        },
        "04": {
            "food": [ 10.20, 11.50, 2.5 ],
            "fuel": []
        }
    },
    "2023-04": {}
}

// Nie usuwałem wszystkich console.log, aby zaprezentować sposób mojego myślenia oraz jak po kolei dostawałem się do każdej wartości

const pharagrafArray = document.querySelector(".pharagraf__array")
const pharagrafResult = document.querySelector(".pharagraf__result")
// console.log(pharagrafArray, pharagrafResult)


function isInFirstWeekOfMonth(date){

    const currentDate = new Date(date);
    // console.log("currentDate:", currentDate)

    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    // console.log(`year: ${year}, month: ${month}`)

    const firstDayOfMonth = new Date(year, month, 1)
    // console.log(`First day of the month: ${firstDayOfMonth}`)

    const firstDayOfWeek = firstDayOfMonth.getDay();
    // console.log(`First day of the week: ${firstDayOfWeek}`)

    const firstSunday = new Date(firstDayOfMonth)
    firstSunday.setDate(firstDayOfMonth.getDate() + (7 - firstDayOfWeek))
    // console.log(`First sunday: ${firstSunday}`)

    const isEarlier = currentDate <= firstSunday
    // console.log(isEarlier)
    
    return isEarlier;
}


function getMedianOfFirstWeekExpenses(expenses) {
    let result;
    const medianas = [];

    // console.log(expenses)
    for (const month of Object.keys(expenses)){
        // console.log("test", month)

        const days = Object.keys(expenses[month])
        for(const day of days){
            // console.log("DAY" , day)
            const newDate = `${month}-${day}`
            // console.log(newDate)

            if(isInFirstWeekOfMonth(newDate)){

                const costs = Object.keys(expenses[month][day])
                // console.log("COSTS", costs)
                const costsValues = Object.values(expenses[month][day])
                // console.log("COSTSVALUES", costsValues)
                // console.log("FOODARRAY", costsValues[0])
                // console.log("FUELARRAY", costsValues[1])

                const connectedArray = costsValues[0].concat(costsValues[1])
                // console.log("CONNECTEDARRAY", connectedArray)

                const sortArray = connectedArray.sort((a, b) => a - b)
                // console.log("SORTARRAY", sortArray)

                

                // console.log("Is even :" , sortArray.length % 2 === 0)
                
                if(sortArray.length % 2 === 0){
                    const higherIndex = sortArray.length / 2
                    const lowerIndex = sortArray.length / 2 - 1 

                    // console.log(`higher index = ${higherIndex}, lower index = ${lowerIndex}`)
                    // console.log(`sortArray[higherIndex]: ${sortArray[higherIndex]}, sortArray[lowerIndex]:${sortArray[lowerIndex]}`)

                    medianas.push((sortArray[higherIndex] + sortArray[lowerIndex]) / 2)
                } else {
                    // console.log(Math.floor(sortArray.length / 2))
                    const middleIndex = Math.floor(sortArray.length / 2)
                    // console.log(sortArray[middleIndex])

                    medianas.push(sortArray[middleIndex])
                }
                // console.log("MEDIANAS", medianas)
            }
        }
    }

    
    // console.log(medianas)
    // console.log("MEDINAS.LENGTH" , medianas.length % 2 === 0)
        if(medianas.length % 2 === 0){
            const higherIndex = medianas.length / 2
            const lowerIndex = medianas.length / 2 - 1 
            // console.log(`medianas[higherIndex]: ${medianas[higherIndex]}, medianas[lowerIndex]: ${medianas[lowerIndex]}`)
            result = (medianas[higherIndex] + medianas[lowerIndex]) / 2
            console.log("RESULT", result)
        } else {
            const middleIndex = Math.floor(medianas.length / 2)
            result = medianas[middleIndex]
        }
    
        pharagrafArray.textContent = `Tablica median za poszczególne miesiące:  [${medianas}]`
        pharagrafResult.textContent = `Ostateczna mediana wyników:  ${result}`
    
    return result;
}



getMedianOfFirstWeekExpenses(expenses)
