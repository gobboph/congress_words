#!/usr/bin/env python

import requests
import pprint
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.figure as fig
import pylab as pl



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
states = np.array(states)

print states[:,1]
print states[:,0]

pos = np.arange(len(states[:,0]))
width = .7

print len(states[:,0])
print len(states[:,1])


font = {'family' : 'normal',
        'weight' : 'normal',
        'size'   : 8}

plt.rc('font', **font)

figure = plt.bar(pos, states[:,1].astype(np.float), width, color='g')
ax = plt.axes()
ax.set_xticks(pos + (width/2))
ax.set_xticklabels(states[:,0])
ax.set_title(X+' in each state')


plt.show()












