const fs = require('fs');

const isValidGrid = grid => {
    const len = grid[0].length;
    for (let i = 0; i < grid.length; ++i)
    {
        if (grid[i].length != len) return false;
        for (let j = 0; j < grid[i].length; ++j)
        {
            if (typeof(parseInt(grid[i][j])) != 'number') return false;
        }
    }

    return true;
};

const q11 = (filepath, n) => {
    let grid = fs.readFileSync(filepath, {encoding: 'utf-8'}).split('\n').map(item => item.replace('\r', '').split(' '));
    if (!isValidGrid(grid)) console.log('invalid grid');
    let max = -Infinity;

    const dirs = [[0, 1], [1, 0], [1, 1], [1, -1]];
    for (let i = 0; i < grid.length; ++i)
    {
        for (let j = 0; j < grid[i].length; ++j)
        {
            const curCoord = [i, j];
            for (let k = 0; k < dirs.length; ++k)
            {
                let curProd = 1;
                let flag = true;

                for (let l = 0; l < n; ++l)
                {
                    let newI = curCoord[0]+dirs[k][0]*l;
                    let newJ = curCoord[1]+dirs[k][1]*l;
                    if (newI < 0 || newI >= grid.length ||
                        newJ < 0 || newJ >= grid[i].length)
                        {
                            curProd = 1;
                            flag = false;
                            break;
                        }
                    curProd *= parseInt(grid[newI][newJ]);
                }

                if (!flag)
                {
                    flag = true;
                    continue;
                }
                max = Math.max(max, curProd);
            }
        }
    }
    return max;
};

const q12 = n => {
    const series = k => k*(k+1)/2;
    let curNum = 1;
    while (true)
    {
        let curSeries = series(curNum);
        let curCounter = 0;
        for (let i = 1; i <= Math.floor(Math.sqrt(curSeries)); ++i)
        {
            if (!(curSeries%i)) ++curCounter;
        }

        if (curCounter >= Math.floor(n/2)+1) return curSeries;
        ++curNum;
    }
};

const q13 = (filepath, n) => {
    return fs.readFileSync(filepath, {encoding: 'utf-8'}).split('\n').map(item => item.replace('\r', ''))
    .map(item => parseInt(item)).reduce((item1, item2) => item1+item2)
    .toLocaleString('fullwide', {useGrouping: false}).substr(0, n);
};

const q14 = n => {
    const collatz = n => n%2 ? 3*n+1 : n/2;
    let collatzArr = new Array(n).fill(0);
    collatzArr[0] = -1;
    let res = 1;
    let curMax = 0;

    for (let i = 2; i < n; ++i)
    {
        let curNum = i;
        let counter = 0;
        while (curNum != 1)
        {
            if (curNum < n && collatzArr[curNum] != 0)
            {
                counter += collatzArr[curNum]
                break;
            }
            curNum = collatz(curNum);
            counter++;
        }
        collatzArr[i] = counter;

        if (counter > curMax)
        {
            curMax = counter;
            res = i;
        }
    }
    
    return res;
};

const q15 = (n, m) => {
    const pascal = [[1], [1, 1]];
    for (let i = 2; i <= n+m; ++i)
    {
        pascal.push([]);
        for (let j = 0; j <= i; ++j)
        {
            if (j == 0 || j == i) pascal[i].push(1)
            else pascal[i].push(pascal[i-1][j]+pascal[i-1][j-1]);
        }
    }
    return pascal[n+m][n];
};

const q16 = n => {
    const arr = BigInt(n).toString().split('');
    return arr.map(item => parseInt(item)).reduce((item1, item2) => item1 + item2);
};

const englishNum1000 = n => {
    n = n.toString();
    const map = {
        '0': '',
        '1': 'one',
        '2': 'two',
        '3': 'three',
        '4': 'four',
        '5': 'five',
        '6': 'six',
        '7': 'seven',
        '8': 'eight',
        '9': 'nine',
        '100': 'onehundred'
    };

    const map1 = {
        '0': 'ten',
        '1': 'eleven',
        '2': 'twelve',
        '3': 'thirteen',
        '4': 'fourteen',
        '5': 'fifteen',
        '6': 'sixteen',
        '7': 'seventeen',
        '8': 'eighteen',
        '9': 'nineteen'
    };

    const map2 = {
        '2': 'twenty',
        '3': 'thirty',
        '4': 'forty',
        '5': 'fifty',
        '6': 'sixty',
        '7': 'seventy',
        '8': 'eighty',
        '9': 'ninety'
    };

    if (n.length == 4) return 'onethousand';
    let result = '';
    if (n.length == 3)
    {
        result += map[n[0]];
        result += 'hundred';
        if (n[1] != '0' || n[2] != '0') result += 'and';
    }
    if (n.length != 1)
    {
        if (n[n.length-2] == '1') return result+map1[n[n.length-1]];
        if (n[n.length-2] != '0') result += map2[n[n.length-2]];
        return result+map[n[n.length-1]];
    }
    return map[n[0]];
};

const q17 = n => {
    if (n > 1000) return 'n larger than 1000';
    let sum = 0;
    for (let i = 0; i < n + 1; ++i)
    {
        sum += englishNum1000(i).length;
    }
    return sum;
};

const q18 = (filepath) => {
    let triangle = fs.readFileSync(filepath, {encoding: 'utf-8'}).split('\n').map(item => item.replace('\r', '').split(' ')).map(item => item.map(item => parseInt(item)));
    for (let i = triangle.length-2; i >= 0; --i)
    {
        for (let j = 0; j < triangle[i].length; ++j)
        {
            triangle[i][j] = triangle[i+1][j] > triangle[i+1][j+1] ? triangle[i][j]+triangle[i+1][j] :
            triangle[i][j]+triangle[i+1][j+1];
        }
    }

    return triangle[0][0];
};

const q19 = () => {
    let counter = 0;
    let sunday = [6, 1, 1901];
    let month30 = [9, 4, 6, 11];
    let month31 = [1, 3, 5, 7, 8, 10, 12];

    while (sunday[2] < 2001)
    {
        sunday[0] += 7;
        let monthAdv = false;
        let yearAdv = false;

        if (sunday[1] == 2)
        {
            let febFlag = false;
            if (sunday[2] % 100 == 0)
            {
                if (sunday[2] % 400 == 0)
                {
                    febFlag = true;
                }
            }
            else{
                if (sunday[2] % 4 == 0)
                {
                    febFlag = true;
                }
            }

            if (febFlag)
            {
                if (sunday[0] > 29)
                {
                    sunday[0] %= 29;
                    monthAdv = true;
                }
            }
            else{
                if (sunday[0] > 28)
                {
                    sunday[0] %= 28;
                    monthAdv = true;
                }
            }
        }
        else if(month30.includes(sunday[1]))
        {
            if (sunday[0] > 30)
            {
                sunday[0] %= 30;
                monthAdv = true;
            }
        }
        else{
            if (sunday[0] > 31)
            {
                sunday[0] %= 31;
                monthAdv = true;
            }
        }

        if (monthAdv)
        {
            if (sunday[1] != 12) sunday[1]++;
            else{
                sunday[1] = 1;
                yearAdv = true;
            }
        }

        if (yearAdv)
        {
            sunday[2]++;
        }

        if (sunday[0] == 1) counter++;
    }

    return counter;
};

const q20 = n => {
    let factorial = BigInt(1);
    for (let i = 1; i < n+1; ++i)
    {
        factorial *= BigInt(i);
    }
    return factorial.toString().split('').map(item => parseInt(item)).reduce((item1, item2) => item1+item2);
};

const main = () => {
    // Question 11
    console.log("Question 11:", q11('q11grid.txt', 4));

    // Question 12
    console.log("Question 12:", q12(500));

    // Question 13
    console.log("Question 13:", q13('q13numbers.txt', 10));
    
    // Question 14
    console.log("Question 14:", q14(1000000));
    
    // Question 15
    console.log("Question 15:", q15(20, 20));
    
    // Question 16
    console.log("Question 16:", q16(2**1000));
    
    // Question 17
    console.log("Question 17:", q17(1000));
    
    // Question 18
    console.log("Question 18:", q18('q18triangle.txt'));
    
    // Question 19
    console.log("Quesiton 19:", q19());
    
    // Question 20
    console.log("Question 20:", q20(100));
};

main();