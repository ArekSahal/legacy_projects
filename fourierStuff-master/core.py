import math
import functools as fun
import matplotlib.pyplot as plt
import matplotlib.animation as ani


information = "fourierApproximation(f,a,b,n) \n f- The function to approximate \n a,b - The interval \n n- how many fourier terms of sin and cos \n showF(ap) \n ap- the function you want to plot \n \n waveSimulation(f,g,P,a) \n f- funktionen för U(x,0) \n g- funktionen för dU/dt(x,0) \n P- perioden \n a- våghastigheten \n simulation(wave) \n wave- the wave you want to simulate  "
print(information)

#define some functions
def wierdFunction(x):
    if x < 0:
        return x
    else:
        return 1/10 * x**2


def step(x):
    if x > 0:
        return math.pi
    else:
        return -1 * math.pi

def x2(x):
    return x**2

def identity(x):
    return x

#Riemann-integrals

def recursiveSummation(b, x, ac, func):
    #does not work.. should tho..
    n = 0.005
    if x >= b:
        return ac
    else:
        newx = x + n
        newAc = ac + func(x)*(n)
        return recursiveSummation(b, newx, newAc, func)

def riemannIntegral(func, x):
    #calculates the Riemannintegral of a function on the points x, x should be a list with points like [0, 0.01, 0.02...] depending on what accuracy you want
    dx = x[2] - x[1]

    def dum(z):
        return func(z) * dx

    ac = fun.reduce(lambda x, y: x + y, list(map(dum, x)))

    return ac

#vector-addition
def add(x1, x2):
    newvector = []
    for i in range(len(x1)):
        newvector.append(x1[i] + x2[i])
    return newvector


#Fourier-stuff

#find the coefficients
def generalCoefficients(func1, func2, P, n):
    def newfunc(x):
        return func1(x) * func2((x*n*math.pi)*2/P)
    return newfunc

def an(func, P, n, d):
    newfunc = generalCoefficients(func, math.cos, P, n)
    return riemannIntegral(newfunc, d) * 2/P

def bn(func, P, n, d):
    newfunc = generalCoefficients(func, math.sin, P, n)
    return riemannIntegral(newfunc, d) * 2/P

#do the series


def fourierApproximation(fun, a, b, n):
    #Takes in a function and a period and calculates the fourie series of them.
    d = []
    functionValue = []
    partialSteps = []
    P = (b - a)
    N = 1000             #how many points do you want to calculate and plot

    for i in range(N):
        #we create our domain and functionValue list
        d.append(a + P*(i/N))
        functionValue.append(0)

    for j in range(n):
        #calculate the series and add them to functionValue
        a = an(fun, P, j, d)
        b = bn(fun, P, j, d)
        if j == 0:
            a = a/2

        def dum1(x):
            return math.cos(j*x*2*math.pi/P) * a

        def dum2(x):
            return math.sin(j*x*2*math.pi/P) * b


        currentNTerm = add (list(map(dum2, d)), list(map(dum1, d)))
        partialSteps.append(currentNTerm)
        functionValue = add(functionValue, currentNTerm)


    return {"domain": d, "originalFunction": list(map(fun, d)), "approximation": functionValue, "partialSteps": partialSteps}

#series = fourierApproximation(wierdFunction, -1, 2, 10)
def showF(series):
    plt.plot(series["domain"], series["originalFunction"])
    plt.plot(series["domain"], series["approximation"])
    plt.legend(["Function", "Approximation"])
    plt.show()

#showF(series)

#wave eq

def extendIntoOdd(f):
    def newfunction(x):
        if x < 0:
            return -1*f(x)
        else:
            return f(x)
    return newfunction


def waveSimulation(f, g, P, v):
    N = 1000
    n = 20
    nth = []
    d = []
    for i in range(n):
        nth.append(i)
    for i in range(N):
        d.append(P*(i/N))
    b = []
    a = []
    for i in nth:
        if i == 0:
            a.append(2*bn(f, 2*P, i, d))
            b.append(0)
        else:
            a.append(2 * bn(f, 2*P, i, d))
            b.append(((4*P)/(v*i*math.pi)) * bn(g, 2*P, i, d))
    def ut(t):
        functionValue = []
        partialValues = []
        for i in range(N):
            functionValue.append(0)
        for i in nth:
            value = list(map(lambda x: (a[i]*math.cos((v*i*t*math.pi)/P) + b[i]*math.sin((v*i*t*math.pi)/P))*math.sin((i*x*math.pi)/P), d))
            partialValues.append(value)
            functionValue = add(functionValue, value)
        return {"domain": d, "functionValue": functionValue, "partialValues": partialValues}
    return ut

def simulation(data):
    fig = plt.figure()
    graph = fig.add_subplot(1,1,1)
    def updateLine(num):
        ins = data(num/10)
        graph.clear()
        graph.set_ylim(-10, 10)
        graph.set_xlim(ins["domain"][0], ins["domain"][-1])
        graph.plot(ins["domain"], ins["functionValue"])
    line_ani = ani.FuncAnimation(fig, updateLine, 1000, interval=1)
    plt.show()

wave1 = waveSimulation(lambda x: math.sin(2*x)*3, lambda x: 5*math.sin(3*x),math.pi ,1)
wave2 = waveSimulation(lambda x: x*(math.pi - x), lambda x: x*0,math.pi ,2)
wave3 = waveSimulation(lambda x: math.sin(x), lambda x: math.sin(x), math.pi, 1)
wave4 = waveSimulation(lambda x: x*(2 - x), lambda x: 1*math.sin(math.pi*x),2 ,2)
#simulation(wave)

