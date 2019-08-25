
import numpy as np
import matplotlib.pyplot as plt
import scipy as sci


class Electric_field():
	"""This class helps visualize electric fields and potentials

	The class takes in either an electric field (E(x, y) -> Ex, Ey), electric potential (__V(x, y) -> __V or charges (?))
	You can also decide the limit I= [a, b] a < b

	call the method show() to see the plot
	"""


	def __init__(self, Ef=None, V=None, Cd=None, I=None, n=200j):
		"""At the moment you can only provide it with a potential __V(x, y) -> z"""

		self.__Ef = Ef
		self.__V = V
		self.__Cd = Cd
		self.__n = n

		if I == None:
			self.__I = [-5, 5]
		else:
			self.__I = I

		# Create two grids so that if you go through them each [x[a, b], y[a, b]] for all a,b you get the entire xy-plane (of course only a finite approximation)
		self.__y, self.__x = np.mgrid[self.__I[0]:self.__I[1]:self.__n, self.__I[0]:self.__I[1]:self.__n]

		self.__fill()


	def __fill(self):
		"""This function should be ran every time there is a change or when the calss is initiated to calculate all
		 attributes correctly"""

		#if self.__Ef:
		#	self.__Ef = self.__calc_ef(self.__Ef)
		#	self.__Cd = self.__nabla(self.__Ef)
		#	self.__V = -1 * self.__antinabla(self.__Ef)
		if self.__V:
			self.__V = self.__calc_v(self.__V)
			#self.__Cd = -1 * self.lap(self.__V)
			self.__Ef = self.__nabla(self.__V)
		#elif self.__Cd:
		#	self.d = self.calc_cd(self.__Cd)
		#	self.__V = self.antilap(self.__Cd)
		#	self.__Ef = self.__antinabla(self.__Cd)


	def __calc_ef(self, f):
		"""takes in a function for an electric field (f(x,y) -> Ex, Ey) and outputs
		   a vector with [0]= the x-component of the vector field [1]= the y-component of the vector field
		   [2]= a relative magnitude of the vector (for coloring intensity)
		"""

		# Through numpy magic we make the function work for any type of np.array
		F = np.vectorize(f)

		U, V = F(self.__x, self.__y)
		C = np.log(np.hypot(U, V))

		return [U, V, C]


	def __calc_v(self, f):
		"""Takes a function for an electric potential (__V(x, y) -> __V) and outputs a matrix so that the element __V[a, b]
		   coresponds to the coordinates [__X[a, b], __Y[a, b]] from the meshgrid"""

		# Through numpy magic we make the function work for any type of np.array
		F = np.vectorize(f)

		V = F(self.__x, self.__y)

		return V


	def __nabla(self, M):
		"""takes in a vector field or potential and returns the corresponding output to the nabla operator"""

		# At the moment only works for potentials

		V, U = np.gradient(M)

		return [U, V, np.log(np.hypot(U, V))]

	def __antinabla(self, E):

		# This should take a input and compute the inverse nabla operation (E = nabla**-1 V)

		return None


	def show(self):
		""" This is where the magic happens """

		# Dont ask why
		V = np.flip(self.__V, 0)

		fig = plt.figure()
		ax = fig.add_subplot(1, 1, 1)
		ax.imshow(V, interpolation='nearest', extent=[self.__I[0], self.__I[1], self.__I[0], self.__I[1]], alpha=0.9)
		ax.streamplot(self.__x, self.__y, self.__Ef[0], self.__Ef[1], color=self.__Ef[2], density=1.5, cmap=plt.cm.inferno)
		fig.show()







def charge_potential(x, y):
	"""Just an example"""

	charges = [[1, 1, 1],[-1, 1, -1], [-1, -1, 1], [1, -1, -1], [0, 0, 1]] #[x, y, q]

	V = 0
	for i in charges:
		V += i[2]*np.log(np.sqrt((i[0] - x)**2 + (i[1] - y)**2))

	return V



E0 = Electric_field(V=charge_potential)
E0.show()


