import matplotlib.pyplot as plt
import numpy as np
from matplotlib.patches import Circle

charges = [[1, 1, 1], [1, -1, -1], [3, 4, -30]]
n = 100j


def charge_potential(charges, x, y):

	V = 0
	for i in charges:
		V += i[2]*np.log(np.sqrt((i[0] - x)**2 + (i[1] - y)**2))

	return V


def distance(r1, r2):

	d = np.linalg.norm(r2 - r1)

	return d


def E(x, y, x0, y0, q):
	e = 1

	r0 = distance(np.array([x, y]), np.array([x0, y0]))

	E0 = (1/(4*np.pi*e)) * (q/(r0**2))

	X0 = E0 * (x0 - x)/r0

	Y0 = E0 * (y0 - y)/r0

	return X0, Y0, E0


def point_charges(f,X,Y,li):
	"""Takes input f= function that ouputs two values, __X= limits on x-axis,
	__Y=limits on why axis both as vectors [0, 1], li=list of charges [[x, y, q], ..]"""

	# I have no idea what is going on here

	y, x = np.mgrid[X[0]:X[1]:n, Y[0]:Y[1]:n]

	F = np.vectorize(f)

	U , V = 0 * np.mgrid[X[0]:X[1]:n, Y[0]:Y[1]:n]
	E = U

	for i in li:
		U0, V0, E0 = F(x, y, i[0], i[1], i[2])
		U += U0
		V += V0

	return U, V, x, y, (10**-12)*np.log(np.hypot(U, V))**3


def field(f, X, Y):
	"""Takes input f= function that ouputs two values, __X= limits on x-axis, __Y=limits on why axis both as vectors [0, 1]"""
	y, x = np.mgrid[X[0]:X[1]:n, Y[0]:Y[1]:n]

	F = np.vectorize(f)

	U, V = F(x, y)

	return U, V, x, y, np.log(np.hypot(U, V))


def E1(x, y):

	x1 = 0
	y1 = 1
	x2 = 0
	y2 = -1

	X = (x1 - x)/((x1 - x)**2 + (y1 - y)**2) - (x2 - x)/((x2 - x)**2 + (y2 - y)**2)
	Y = (y1 - y)/((x1 - x)**2 + (y1 - y)**2) - (y2 - y)/((x2 - x)**2 + (y2 - y)**2)

	A = x + y
	B = -x - y

	return A, B


def show_points():

	U, V, X, Y, C = point_charges(E, [-5, 5], [-5, 5], charges)

	fig = plt.figure()
	ax = fig.add_subplot(111)

	charge_colors = ['#aa0000', '#0000aa']
	ax.streamplot(X, Y, U, V, color=C, density=2, cmap=plt.cm.inferno)

	for q in charges:
		c = 0
		if q[2] > 0:
			c = 1
		ax.add_artist(Circle([q[0], q[1]], 0.2, color=charge_colors[c]))
	plt.show()
	return U, V, X, Y


def show_field():

	U, V, X, Y, C = field(E1, [-5, 5], [-5, 5])
	plt.streamplot(X, Y, U, V, color=C, density=2)
	return U, V, X, Y


U, V, X, Y = show_points()





