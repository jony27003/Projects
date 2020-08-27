const q1 = (n, mods) => {
    let res = 0;
    for (let i = 0; i < n; ++i)
    {
        for (let mod = 0; mod < mods.length; ++mod)
        {
            if (!(i%mods[mod])) {
                res += i;
                break;
            }
        }
    }

    return res;
};

const q2 = n => {
    let f1 = 1, f2 = 1;
    let sum = 0;

    while (f2 < n+1)
    {
        let temp = f2;
        f2 = f1+f2;
        f1 = temp;
        if (!(f2 % 2))
        {
            sum += f2;
        }
    }

    return sum;
};

const q3 = n => {
    for (let i = 2; i < Math.floor(Math.sqrt(n))+1; ++i)
    {
        while (!(n%i))
        {
            n /= i;
        }
    }
    return n;
};

const q4 = n => {
    let res = 0;
    let bound = 0;

    for (let m1 = 10**n-1; m1 >= 10*(n-1); --m1)
    {
        let m2;
        for (m2 = 10**n-1; m2 >= 10*(n-1); --m2)
        {
            if (m1*m2 <= bound) break;
            if ((m1*m2).toString() == (m1*m2).toString().split("").reverse().join("") && m1*m2 > res) res = m1*m2;
        }
        bound = m1*m2;
    }

    return res;
}

const q5 = n => {
    const factors = [];
    for (let i = 1; i < n+1; ++i)
    {
        factors.push(i);
    }

    for (let i = 0; i < factors.length; ++i)
    {
        for (let j = 0; j < i; ++j)
        {
            if (!(factors[i]%factors[j])) factors[i] /= factors[j];
        }
    }

    let res = 1;
    factors.forEach(item => res *= item);
    return res;
};

const q6 = n => {
    let sum = 0;
    for (let i = 1; i < n+1; ++i)
    {
        sum += i*i;
    }
    return (n*(n+1)/2)**2 - sum;
};

const q7 = n => {
    const sieve = new Array(2*Math.floor(n*Math.log(n))+n).fill(true);
    sieve[0] = false;
    for (let i = 1; i < Math.floor(Math.sqrt(sieve.length)); ++i)
    {
        let counter = 1;
        while (i+counter*(i+1) < sieve.length)
        {
            sieve[i+counter*(i+1)] = false;
            counter++;
        }
    }

    let prime = 0;
    for (let i = 0; i < sieve.length; ++i)
    {
        if (sieve[i])
        {
            prime++;
            if (prime == n) return i+1;
        }
    }
};

const q8 = (n, num) => {
    const strN = typeof(num) == "string" ? num : num.toString();
    let prod = 0;

    for (let i = 0; i < strN.length - n; ++i)
    {
        const arr = strN.slice(i, i+n).split("").map(item => parseInt(item));
        prod = prod > arr.reduce((n1, n2) => n1*n2) ? prod : arr.reduce((n1, n2) => n1*n2);
    }

    return prod;
};

const q9 = n => {
    for (let i = 1; i < 1001; ++i)
    {
        for (let j = 1; j < 1001; ++j)
        {
            let k = n - i - j;
            if (i<j && j<k && i*i + j*j == k*k)
            {
                return i*j*k;
            }
        }
    }
};

const q10 = n => {
    const primes = new Array(n).fill(true);
    primes[1] = false;

    for (let i = 2; i < Math.floor(Math.sqrt(n-1)); ++i)
    {
        if (!primes[i]) continue;
        let counter = 1;
        while (i + counter*i < n)
        {
            primes[i + counter*i] = false;
            counter++;
        }
    }

    let sum = 0;
    for (let i = 0; i < n; ++i)
    {
        if (primes[i]) sum += i;
    }

    return sum;
};

const main = () => {
    // Question 1
    console.log("Question 1:", q1(1000, [3, 5]));

    // Question 2
    console.log("Question 2:", q2(4000000));

    // Question 3
    console.log("Question 3:", q3(600851475143));

    // Question 4
    console.log("Question 4:", q4(3));

    // Question 5
    console.log("Question 5:", q5(20));

    // Question 6
    console.log("Question 6:", q6(100));

    // Question 7
    console.log("Question 7:", q7(10001));

    // Question 8
    console.log("Question 8:", q8(13, "7316717653133062491922511967442657474235534919493496983520312774506326239578318016984801869478851843858615607891129494954595017379583319528532088055111254069874715852386305071569329096329522744304355766896648950445244523161731856403098711121722383113622298934233803081353362766142828064444866452387493035890729629049156044077239071381051585930796086670172427121883998797908792274921901699720888093776657273330010533678812202354218097512545405947522435258490771167055601360483958644670632441572215539753697817977846174064955149290862569321978468622482839722413756570560574902614079729686524145351004748216637048440319989000889524345065854122758866688116427171479924442928230863465674813919123162824586178664583591245665294765456828489128831426076900422421902267105562632111110937054421750694165896040807198403850962455444362981230987879927244284909188845801561660979191338754992005240636899125607176060588611646710940507754100225698315520005593572972571636269561882670428252483600823257530420752963450"))

    // Question 9
    console.log("Question 9:", q9(1000));

    // Question 10
    console.log("Question 10:", q10(2000000));
};

main();
