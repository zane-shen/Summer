#!/usr/bin/python
#coding:utf-8
import sys
import pandas as pd
#from pandas_datareader import data as web
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
plan = 2
# 以下参数为该页面用户输入的
type = int(sys.argv[1])
age = int(sys.argv[2])#28
income = int(sys.argv[3])#3000
re_age = int(sys.argv[4])#60
payout = int(sys.argv[5])#2000
after_time = int(sys.argv[6])#30

# 以下参数为后台处理的
m = type - 1
time = re_age - age
print nav_50_m_1[portfolios[m]]
print time * 12 + after_time*12 + 1
# rec_topup初始位置计算
avgret =((nav_50_m_1[portfolios[m]].iloc[time * 12 + after_time*12 + 1]/nav_50_m_1[portfolios[m]].iloc[time * 12 + 1])**(1/float(after_time*12)))-1
pv = payout*(1.02**time)* (((1-(1/float((1+avgret)**(after_time*12-1))))/avgret)+1)
rec_topup = income * 0.2
fv = rec_topup * ((((1 + avgret_50_m[portfolios[m]].iloc[time * 12 + 1]) ** (time * 12 + 1) - 1) /
                       avgret_50_m[portfolios[m]].iloc[time * 12 + 1]) - 1)

if fv > pv:
    rec_topup = pv / ((((1 + avgret_50_m[portfolios[m]].iloc[time * 12 + 1]) ** (time * 12 + 1) - 1) /
                                 avgret_50_m[portfolios[m]].iloc[time * 12 + 1]) - 1)
print(rec_topup)
