# usr/bin/env python3
# -*- coding: utf-8 -*-


"""
description du module :

définition de l'objet cube
plutôt que de voir la chaine de petit cube comme tel, il faut le voir comme une liste d'instruction à suivre
avec pour condition de ne jamais repasser sur ses pas
chaque petit cube de la chaine sont appelé cubatome
le grand cube qui doit être composé à partir de la chaine de cubatome est appelé cube64 ou bigcube

auteur : Nicolas Durmi
"""

import numpy as np
import random
import timeit


class cube64:

	def __init__(self, adn):
		self.adn = adn
		self.noeuds = [1]*(len(adn)+2)
		self.coordonnees = self.chemin()
		
	def get_coordonnees(self):
		return self.coordonnees

	def get_noeuds(self):
		return self.noeuds

	def get_noeud_for_cubatome(self, cubatome):
		for i in range(0, len(self.noeuds)):
			if sum(self.adn[:i]) > cubatome:
				return i
		return i

	def set_noeud_for_cubatome(self, cubatome):
		noeud = self.get_noeud_for_cubatome(cubatome)
		if self.noeuds[noeud] == 3:
			self.noeuds[noeud] = 0
		else :
			self.noeuds[noeud] +=1
		self.coordonnees = self.chemin()


	def set_noeuds(self, combinaisons):
		if len(combinaisons) < len(self.adn)+2:
			self.noeuds = combinaisons + [1]*(len(self.adn)+2-len(combinaisons))
		else:
			self.noeuds = combinaisons[:len(self.adn)+2]
		self.coordonnees = self.chemin()

	def get_len_adn(self):
		return len(self.adn)

	def affichage(self):
		xmax, ymax, zmax = np.max(self.coordonnees, axis=0)
		planxy = np.zeros((xmax+1, ymax+1))

		for x, y, z in self.coordonnees:
		    planxy[x, y] = 1

		planxy = planxy.T
		lignes_en_chaine = [''.join(['x' if cell == 1 else ' ' for cell in ligne]) for ligne in planxy]

		# Construction de la chaîne de caractères pour l'affichage
		affichage = '\n'.join(lignes_en_chaine)
		print(affichage)

	def chemin(self):
		position = [-1,0,0]
		orientation = [1,0,0]
		coordonnees = []
		noeud = 1
		for pas in range(0,64):
			position = list(np.array(position) + np.array(orientation))
			coordonnees.append(position)
			if sum(self.adn[:noeud]) == pas+1:
				noeud += 1
				directions = cube64.directions_possibles(orientation)
				orientation = directions[self.noeuds[noeud]]
		return coordonnees

	def directions_possibles(orientation):
	    directions = []
	    for x in [-1, 1]:
	        directions.append([x, 0, 0])
	    for y in [-1, 1]:
	        directions.append([0, y, 0])
	    for z in [-1, 1]:
	        directions.append([0, 0, z])
	    return [d for d in directions if not any((df != 0 and d[i] != 0) for i, df in enumerate(orientation))]


if __name__ == "__main__":
	cube_chaine = [3,1,2,1,1,3,1,2,1,2,1,2,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,2,3,1,1,1,3,1,2,1,1,1,1,1,1,1,1,1,3,1]
	cube = cube64(cube_chaine)
	cube.affichage()