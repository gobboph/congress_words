#!/usr/bin/env python

import requests
import pprint
import numpy as np
import matplotlib.pyplot as plt

query_params_peace = { 'apikey': '2cd8dea668b840f989b145e88cb2be80',
				 #'per_page': 3,
		   		 'phrase': 'peace',
		   		 'sort': 'count desc'
		 		}

query_params_war = { 'apikey': '2cd8dea668b840f989b145e88cb2be80',
				 #'per_page': 3,
		   		 'phrase': 'war',
		   		 'sort': 'count desc'
		 		}

endpoint = "http://capitolwords.org/api/phrases/state.json"

response_peace = requests.get(endpoint, params=query_params_peace)
data_peace = response_peace.json()
#pprint.pprint(data)
#print data_peace['results'][0]

response_war = requests.get(endpoint, params=query_params_war)
data_war = response_war.json()
#pprint.pprint(data)
#print data_war['results'][0]


#states = []
#count_peace = []
#count_war = []


peace = []
war = []

for i in range(len(data_peace['results'])):
	#states.append(data_peace['results'][i]['state'])
	#count_peace.append(data_peace['results'][i]['count'])
	peace.append([data_peace['results'][i]['state'], data_peace['results'][i]['count']])
	i+=1

for i in range(len(data_war['results'])):
	#states.append(data_peace['results'][i]['state'])
	#count_peace.append(data_peace['results'][i]['count'])
	war.append([data_war['results'][i]['state'], data_war['results'][i]['count']])
	i+=1


tot = {}

for x in peace:
	for y in war:
		if x[0]==y[0]:
			tot[x[0]] = [x[1],y[1]]

#print tot

#print str(len(peace))
#print str(len(war))

states = []
count_peace = []
count_war = []

difference = []

for key in tot:
	states.append(key)
	count_peace.append(tot[key][0])
	count_war.append(tot[key][1])
	difference.append(tot[key][0]/tot[key][1]*100)




font = {'family' : 'normal',
        'weight' : 'normal',
        'size'   : 8}

plt.rc('font', **font)

pos = np.arange(len(states))
#width = .7     # gives histogram aspect to the bar diagram

X = raw_input('Do you want to see the (T)otal time they say war and peace or the (P)ercentage they say peace with respect to war? ').upper()

if X == 'T':
	width = .35
	fix, ax = plt.subplots()
	peace_bar = ax.bar(pos, count_peace, width, color='b')
	war_bar   = ax.bar(pos+width, count_war, width, color='r')
	ax.legend( (peace_bar[0], war_bar[0]), ('Peace', 'War') )
	ax.set_xticks(pos + (width))
elif X == 'P':
	width = .7
	ax = plt.axes()
	ax.set_xticks(pos + (width/2))
	plt.bar(pos, difference, width, color='y')

ax.set_xticklabels(states)
ax.set_title('States')

#plt.bar(pos, count_peace, width, color='b')
#plt.bar(pos, count_war, width, color='r')

#fig = plt.gcf()
#fig.set_size_inches(18.5,10.5)

plt.show()


#for i in range(len(data['results'])):
#	print data['results'][i]['speaker_first']+' '+data['results'][i]['speaker_last']+' '+data['results'][i]['date']
