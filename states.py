#!/usr/bin/env python

import requests
import numpy as np
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

var number_of_congressmen = {'WA':12, 'OR':7, 'CA':55, 'NV':6, 'AK':3, 'HI':4,
'ID':4, 'MT':3, 'WY':3, 'UT':6, 'AZ':11, 'NM':5, 'CO':9, 'ND':3, 'SD':3,
'NE':5, 'KS':6, 'OK':7, 'TX':38, 'LA':8, 'AR':6, 'MO':10, 'IA':6, 'MN':10,
'WI':10, 'IL':21, 'MI':16, 'IN':11, 'KY':8, 'TN':11, 'AL':9, 'MS':6, 'GA':16,
'FL':29, 'SC':9, 'NC':15, 'VA':13, 'WV':5, 'OH':18, 'PA':20, 'NY':29,
'VT':3, 'NH':4, 'ME':4, 'MA':11, 'RI':4, 'CT':7, 'NJ':14, 'DE':3, 'MD':10, 'DC':3};

#print len(number_of_congressmen)

# Normalize for number of congress representative
for key1 in states_dict:
	for key2 in number_of_congressmen:
		if key1 == key2:
			states_dict[key1] = states_dict[key1]/ number_of_congressmen[key1]

#print states_dict


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











