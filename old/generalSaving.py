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
returns_20_m = pd.read_excel('../data/returns_20_m.xlsx')
returns_50_m = pd.read_excel('../data/returns_50_m.xlsx')
returns_90_m = pd.read_excel('../data/returns_90_m.xlsx')
avgret_20_m = pd.read_excel('../data/avgret_20_m.xlsx')
avgret_50_m = pd.read_excel('../data/avgret_50_m.xlsx')
avgret_90_m = pd.read_excel('../data/avgret_90_m.xlsx')
nav_50_m_1=pd.read_excel('../data/nav_50_m.xlsx')
nav_90_m_1=pd.read_excel('../data/nav_90_m.xlsx')
nav_20_m_1=pd.read_excel('../data/nav_20_m.xlsx')
nav_20_m = returns_20_m.copy()
nav_50_m = returns_50_m.copy()
nav_90_m = returns_90_m.copy()
nav_rec_m = returns_50_m.copy()
portfolios = ['very_conservative','conservative','balanced','aggressive','very_aggressive']
# 提取日期
today = datetime.date.today()
# 用户选择general saving模块
plan = 1#没用
# 以下参数为该页面用户输入的
type = (int)(sys.argv[1])
time = (int)(sys.argv[2])
initial = (int)(sys.argv[3])
topup = (int)(sys.argv[4])
# 以下参数为后台处理的
m = type - 1

# 设定时间轴
dates = [today + relativedelta(months=i) for i in range(0, (time ) * 12 + 1)]
# projection曲线各点计算
nav_20_m.iloc[0] = initial
nav_50_m.iloc[0] = initial
nav_90_m.iloc[0] = initial
nav_rec_m.iloc[0] = initial

for n in range(1,time*12+1):
    nav_20_m[portfolios[m]].iloc[n] = nav_20_m[portfolios[m]].iloc[n - 1] * (
    returns_20_m[portfolios[m]].iloc[n] + 1) + topup
    nav_90_m[portfolios[m]].iloc[n] = nav_90_m[portfolios[m]].iloc[n - 1] * (
    returns_90_m[portfolios[m]].iloc[n] + 1) + topup
    nav_50_m[portfolios[m]].iloc[n] = nav_50_m[portfolios[m]].iloc[n - 1] * (
    returns_50_m[portfolios[m]].iloc[n] + 1) + topup
    nav_rec_m[portfolios[m]].iloc[n] = nav_rec_m[portfolios[m]].iloc[n - 1] * 1.00025 + topup

print (time*12+1)

print 'flag'
for n in range(0,time*12+1):
    print int(nav_20_m[portfolios[m]].iloc[n])

print 'flag'
for n in range(0,time*12+1):
    print int(nav_90_m[portfolios[m]].iloc[n])

print 'flag'
for n in range(0,time*12+1):
    print int(nav_50_m[portfolios[m]].iloc[n])

print 'flag'
for n in range(0,time*12+1):
    print int(nav_rec_m[portfolios[m]].iloc[n])
#
# # 曲线绘制（dates为横坐标，nav为纵坐标）
# ## 线1
# plt.plot(dates,nav_20_m[portfolios[m]].iloc[0:int(time*12)+1],label="20% chance",linewidth=1,alpha=0.5)
# ## 线2
# plt.plot(dates,nav_50_m[portfolios[m]].iloc[0:int(time*12)+1],label="Avg",color="g",linewidth=2,alpha=0.75)
# ## 线3
# plt.plot(dates,nav_90_m[portfolios[m]].iloc[0:int(time*12)+1],label="90% chance",linewidth=1,alpha=0.5)
# ## 线4
# plt.plot(dates,nav_rec_m[portfolios[m]].iloc[0:int(time*12)+1],label="Deposit", linewidth=1, alpha=0.5)
#
# # 各曲线间颜色填充
# plt.fill_between(dates,nav_20_m[portfolios[m]].iloc[0:int(time*12)+1],nav_50_m[portfolios[m]].iloc[0:int(time*12)+1],  color='blue',alpha=0.1)
# plt.fill_between(dates,nav_50_m[portfolios[m]].iloc[0:int(time*12)+1],nav_90_m[portfolios[m]].iloc[0:int(time*12)+1],  color='green',alpha=0.1)
# plt.show()
