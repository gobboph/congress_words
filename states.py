#!/usr/bin/env python

import requests
#import pprint
import numpy as np
import matplotlib.pyplot as plt
#import matplotlib.figure as fig
#import pylab as pl
from BeautifulSoup import BeautifulSoup



X = raw_input('Which word do you want to look for? ').lower()


query_params = { 'apikey': '2cd8dea668b840f989b145e88cb2be80',
				 #'per_page': 3,
		   		 'phrase': X,
		   		 'sort': 'count desc'
		 		}

endpoint = "http://capitolwords.org/api/phrases/state.json"

response = requests.get(endpoint, params=query_params)
data= response.json()


states = [(data['results'][i]['state'],data['results'][i]['count']) for i in range(len(data['results']))]
states_np = np.array(states)

states_dict = dict(states)


# Histogram down here

'''
pos = np.arange(len(states_np[:,0]))
width = .7
font = {'family' : 'normal',
        'weight' : 'normal',
        'size'   : 8}

plt.rc('font', **font)

figure = plt.bar(pos, states_np[:,1].astype(np.float), width, color='g')
ax = plt.axes()
ax.set_xticks(pos + (width/2))
ax.set_xticklabels(states[:,0])
ax.set_title(X+' in each state')


plt.show()
'''

# Load the SVG map
svg = open('states.svg', 'r').read()
# Load into Beautiful Soup
soup = BeautifulSoup(svg, selfClosingTags=['defs','sodipodi:namedview'])
# Find states
paths = soup.findAll('path')
# Map colors
colors = ["#edf8e9", "#c7e9c0", "#a1d99b", "#74c476", "#31a354", "#006d2c"]


# State style
path_style = 'font-size:12px;fill-rule:nonzero;stroke:#FFFFFF;stroke-opacity:1;stroke-width:0.1;\
stroke-miterlimit:4;stroke-dasharray:none;stroke-linecap:butt;\
marker-start:none;stroke-linejoin:bevel;fill:'

# Color the states
for p in paths:
	if p['id'] == "path57":
		continue
	if p['id'] != "path57":
		# pass
		if p['id'] not in ["MI-", "SP-"]:
			try:
				rate = states_dict[p['id']]
			except:
				continue
		else:
			try:
				rate = states_dict['MI']
			except:
				continue

        min_value = states_np[:,1].astype(np.float).min()
        max_value = states_np[:,1].astype(np.float).max()

        if rate > (max_value-min_value)*4/5:
            color_class = 5
        elif rate > (max_value-min_value)*3/5:
            color_class = 4
        elif rate > (max_value-min_value)*2/5:
            color_class = 3
        elif rate > (max_value-min_value)*1/5:
            color_class = 2
        elif rate > 0:
            color_class = 1
        else:
            color_class = 0
        color = colors[color_class]
        p['style'] = path_style + color



# Output map
new_map = soup.prettify()

#print new_map

f = open('map.svg', 'w')
f.write(new_map)
f.close()











