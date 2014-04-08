#!/usr/bin/env python

import requests
import numpy as np
import matplotlib.pyplot as plt
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

#print len(states_np[:,0])
#print states

number_of_congressmen = {'WA':9, 'OR':5, 'CA':53, 'NV':3, 'AK':1, 'HI':2, \
'ID':2, 'MT':1, 'WY':1, 'UT':3, 'AZ':8, 'NM':3, 'CO':7, 'ND':1, 'SD':1, \
'NE':3, 'KS':4, 'OK':5, 'TX':32, 'LA':7, 'AR':4, 'MO':9, 'IA':5, 'MN':8, \
'WI':8, 'IL':19, 'MI':15, 'IN':9, 'KY':6, 'TN':9, 'AL':7, 'MS':4, 'GA':13, \
'FL':25, 'SC':6, 'NC':13, 'VA':11, 'WV':3, 'OH':18, 'PA':19, 'NY':29, \
'VT':1, 'NH':2, 'ME':2, 'MA':10, 'RI':2, 'CT':5, 'NJ':13, 'DE':1, 'MD':8, 'DC':1}
#print len(number_of_congressmen)

# Normalize for number of congress representative
for key1 in states_dict:
	for key2 in number_of_congressmen:
		if key1 == key2:
			states_dict[key1] = states_dict[key1]/ number_of_congressmen[key1]

#print states_dict


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
#colors = ["#edf8fb", "#ccece6", "#99d8c9", "#66c2a4", "#41ae76", "#238b45", "#005824"]
colors = ["#edf8e9", "#c7e9c0", "#a1d99b", "#74c476", "#41ab5d", "#238b45", "#005a32"]

# State style
path_style = 'font-size:12px;fill-rule:nonzero;stroke:#FFFFFF;stroke-opacity:1;stroke-width:0.7;\
stroke-miterlimit:4;stroke-dasharray:none;stroke-linecap:butt;\
marker-start:none;stroke-linejoin:bevel;fill:'

# Color the states
for p in paths:
	if p['id'] == "path57":
		continue
	if p['id'] != "path57":
		# pass
		if p['id'] in ["MI-", "SP-"]:
			try:
				rate = states_dict['MI']
			except:
				continue
		else:
			try:
				rate = states_dict[p['id']]
			except:
				continue

        #min_value = states_np[:,1][0].astype(np.float).min()
        #max_value = states_np[:,1][0].astype(np.float).max()
        min_value = min(states_dict.itervalues())
        max_value = max(states_dict.itervalues())

        if rate > (max_value-min_value)*5/6:
            color_class = 6
        elif rate > (max_value-min_value)*4/6:
            color_class = 5
        elif rate > (max_value-min_value)*3/6:
            color_class = 4
        elif rate > (max_value-min_value)*2/6:
            color_class = 3
        elif rate > (max_value-min_value)/6:
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

f = open(X+'.svg', 'w')
f.write(new_map)
f.close()











