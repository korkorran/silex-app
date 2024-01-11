# usr/bin/env python3
# -*- coding: utf-8 -*-

"""
description du module :
cube_solver, l'objectif est de tester le maximum de combinaison pertinente
la méthode est d'identifier noeud qui pose problème pour ne pas tester toutes
les combinaisons de noeuds après
"""

from cube64_2 import *
import random
import math

def univers_init(dim=7):
	matrice_3d = np.zeros((dim, dim, dim), dtype=int)
	return matrice_3d

def volume(univers):
    indices = np.argwhere(univers == 1)
    if len(indices) == 0:
        return [0] 
    min_coords = np.min(indices, axis=0)
    max_coords = np.max(indices, axis=0)
    dimensions = max_coords - min_coords + 1
    return dimensions

def test_combinaison(cube, combinaison):
	cube.set_noeuds(combinaison)
	univers = univers_init()
	decalage = [3,3,3]
	orientation = [1,0,0]
	result = "reussi"

	for num, coord in enumerate(cube.get_coordonnees()):
		position = list(np.array(decalage) + np.array(coord))
		if not (all(0 <= c < 7 for c in position)):
			result = "sortie de l'univers"
			break
		elif univers[tuple(position)] >= 1:
			result = "superposition"
			break
		elif not all(dimension <= 4 for dimension in volume(univers)):
			result = "volume dépassant le 4x4x4"
			break
		elif compter_poches_cube(univers) > 1:
			result = "trop de poches"
			print(result,compter_poches_cube(univers), cube.get_noeud_for_cubatome(num))
			break
		univers[tuple(position)] += 1
	return cube.get_noeud_for_cubatome(num), result

def compter_poches_cube(matrice):
	if all(dimension == 4 for dimension in volume(matrice)):
		matrice = trouver_sous_matrice(matrice)
		return compter_poches(matrice)
	return compter_poches(matrice)

def trouver_sous_matrice(matrice):
    indices = np.argwhere(matrice == 1)
    if len(indices) == 0:
        return None  # Aucun "1" dans la matrice
    min_coords = np.min(indices, axis=0)
    max_coords = np.max(indices, axis=0) 
    # Extraire la sous-matrice
    sous_matrice = matrice[min_coords[0]:max_coords[0]+1,
                           min_coords[1]:max_coords[1]+1,
                           min_coords[2]:max_coords[2]+1]
    return sous_matrice

def incrementer_liste(listetotal, index=-1):
	liste = listetotal[:index]
	i = len(liste) - 1
	while i >= 0:
		if liste[i] < 3:
			liste[i] += 1
			break
		else:
			liste[i] = 0
			i -= 1
	return liste + listetotal[index:]

def fourgits_to_base10(fourgits):
    return sum(val * (4 ** i) for i, val in enumerate(reversed(fourgits)))

def puissance_de_10_proche(nombre):
    # Calculer la puissance de 10 la plus proche en utilisant le logarithme en base 10
    if nombre == 0:
    	return 0
    if nombre < 0:
    	nombre = -nombre
    puissance = round(math.log10(nombre))
    return 10 ** puissance

def dfs(matrice, x, y, z, visite):
    # Vérifier si la position est dans la matrice et si le point n'a pas été visité et est un zéro
    if (0 <= x < len(matrice) and 0 <= y < len(matrice[0]) and 0 <= z < len(matrice[0][0])
            and not visite[x][y][z] and matrice[x][y][z] == 0):
        visite[x][y][z] = True  # Marquer comme visité

        # Appeler récursivement dfs sur tous les voisins adjacents
        dfs(matrice, x + 1, y, z, visite)
        dfs(matrice, x - 1, y, z, visite)
        dfs(matrice, x, y + 1, z, visite)
        dfs(matrice, x, y - 1, z, visite)
        dfs(matrice, x, y, z + 1, visite)
        dfs(matrice, x, y, z - 1, visite)

def compter_poches(matrice):
    visite = [[[False for _ in range(len(matrice[0][0]))] for _ in range(len(matrice[0]))] for _ in range(len(matrice))]
    nombre_poches = 0

    for x in range(len(matrice)):
        for y in range(len(matrice[0])):
            for z in range(len(matrice[0][0])):
                if matrice[x][y][z] == 0 and not visite[x][y][z]:
                    dfs(matrice, x, y, z, visite)
                    nombre_poches += 1  # Une nouvelle poche trouvée

    return nombre_poches


cube_chaine = [3,1,2,1,1,3,1,2,1,2,1,2,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,2,3,1,1,1,3,1,2,1,1,1,1,1,1,1,1,1,3,1]
cube = cube64(cube_chaine)
combinaison = [random.randint(0, 3) for i in range(0, cube.get_len_adn())]
#combinaison_default = [0 for i in range(0, cube.get_len_adn())]
combinaison_default = combinaison
comb_max = [3 for i in range(0, cube.get_len_adn())]

print("combinaison n°", puissance_de_10_proche(fourgits_to_base10(combinaison_default)))
print("combinaison max", len(str(puissance_de_10_proche(fourgits_to_base10(comb_max)))))

n = 10000

num = fourgits_to_base10(combinaison_default)

for i in range(0, n):
	noeud, res = test_combinaison(cube, combinaison_default)
	if res != "reussi":
		combinaison_default = incrementer_liste(combinaison_default, noeud+1)
	else:
		print(combinaison_default, res)
	if i % int(10) == 0:
		print(i, noeud)
		num = puissance_de_10_proche(fourgits_to_base10(combinaison_default))
		#print(combinaison_default, noeud)
print(combinaison_default, num)


