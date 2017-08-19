#!/usr/bin/python
#coding:utf-8
import sys
import pandas as pd
# from pandas_datareader import data as web
import numpy as np
import matplotlib.pyplot as plt
import datetime
from dateutil.relativedelta import relativedelta
from numpy import cumsum, log, polyfit, sqrt, std, subtract
from numpy.random import randn
import heapq as hq
import math

# 提取数据

avgret_20_m = pd.read_excel('../data/avgret_20_m.xlsx')
avgret_50_m = pd.read_excel('../data/avgret_50_m.xlsx')
avgret_90_m = pd.read_excel('../data/avgret_90_m.xlsx')
nav_50_m_1=pd.read_excel('../data/nav_50_m.xlsx')
nav_90_m_1=pd.read_excel('../data/nav_90_m.xlsx')
nav_20_m_1=pd.read_excel('../data/nav_20_m.xlsx')

portfolios = ['very_conservative','conservative','balanced','aggressive','very_aggressive']

# 用户选择RETIREMENT PLAN
plan = 2#useless
# 以下参数为该页面用户输入的
type = int(sys.argv[1])
age = int(sys.argv[2])#28
re_age = int(sys.argv[3])#60
payout = float(sys.argv[4])#2000
after_time = int(sys.argv[5])#30
## rec_topup等于滑动条的值
rec_topup = float(sys.argv[6])#284

# 以下参数为后台处理的
m = type - 1
time = re_age - age

# 计算rec_initial
avgret =((nav_50_m_1[portfolios[m]].iloc[time * 12 + after_time*12 + 1]/nav_50_m_1[portfolios[m]].iloc[time * 12 + 1])**(1/float(after_time*12)))-1
pv = payout*(1.02**time)* (((1-(1/((1+avgret)**(after_time*12-1))))/avgret)+1)
fv = rec_topup * ((((1 + avgret_50_m[portfolios[m]].iloc[time * 12 + 1]) ** (time * 12 + 1) - 1) /
                       avgret_50_m[portfolios[m]].iloc[time * 12 + 1]) - 1)
if fv > pv:
    rec_topup = pv / ((((1 + avgret_50_m[portfolios[m]].iloc[time * 12 + 1]) ** (time * 12 + 1) - 1) /
                                 avgret_50_m[portfolios[m]].iloc[time * 12 + 1]) - 1)
    rec_initial = 0
else:
    rec_initial = (pv - fv) / ((1 + avgret_50_m[portfolios[m]].iloc[time * 12 + 1]) ** (time*12))

print rec_initial
# print('recommended monthly invest amount',rec_initial)
