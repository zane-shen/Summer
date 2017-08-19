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
# 用户选择RETIREMENT PLAN
plan = 2#useless
# 以下参数为该页面用户输入的
type = int(sys.argv[1])#1
income = int(sys.argv[2])#3000
age = int(sys.argv[3])#28
re_age = int(sys.argv[4])#60
payout = int(sys.argv[5])#2000
after_time = int(sys.argv[6])#30
rec_topup = int(sys.argv[7])#595
initial = int(sys.argv[8])#0
topup = int(sys.argv[9])#500
rec_initial = int(sys.argv[10])##需要给出来

# 以下参数为后台处理的
m = type - 1
time = re_age - age
# 设定时间轴
dates = [today + relativedelta(months=i) for i in range(0, (time + after_time) * 12 + 1)]
# projection曲线各点计算
nav_20_m.iloc[0] = initial
nav_50_m.iloc[0] = initial
nav_90_m.iloc[0] = initial
nav_rec_m.iloc[0] = rec_initial

for n in range(1,time*12+1+after_time*12):
    if n < time*12+1:
        nav_rec_m[portfolios[m]].iloc[n] = nav_rec_m[portfolios[m]].iloc[n - 1] * (
        returns_50_m[portfolios[m]].iloc[n] + 1) + rec_topup
        nav_50_m[portfolios[m]].iloc[n] = nav_50_m[portfolios[m]].iloc[n - 1] * (
        returns_50_m[portfolios[m]].iloc[n] + 1) + topup
    else:
        nav_50_m[portfolios[m]].iloc[n] = nav_50_m[portfolios[m]].iloc[n - 1] * (returns_50_m[portfolios[m]].iloc[n] + 1) - payout * (1.02 ** time)
        nav_rec_m[portfolios[m]].iloc[n] = nav_rec_m[portfolios[m]].iloc[n - 1] * (returns_50_m[portfolios[m]].iloc[n] + 1) - payout * (1.02 ** time)
        if nav_50_m[portfolios[m]].iloc[n] < 0:
            nav_50_m[portfolios[m]].iloc[n] = 0
        if nav_rec_m[portfolios[m]].iloc[n] < 0:
            nav_rec_m[portfolios[m]].iloc[n] = 0
avgret =((nav_50_m_1[portfolios[m]].iloc[time * 12 + after_time*12 + 1]/(nav_50_m_1[portfolios[m]].iloc[time * 12 + 1]))**(1/float(after_time*12)))-1
pv = payout * (1.02 ** time) * (((1 - (1 / ((1 + avgret) ** (after_time * 12 - 1)))) / avgret) + 1)

print (time*12+1)

print 'flag'#线1
for n in range(0,time*12+1):
    print int(nav_rec_m[portfolios[m]].iloc[n])

print 'flag'#线2
for n in range(0,time*12+1):
    print int(nav_50_m[portfolios[m]].iloc[n])

# 曲线绘制（dates为横坐标，nav为纵坐标）
# ##线4
# plt.hlines(pv, dates[0], dates[time * 12], colors="c", linestyles="dashed", alpha=0.75)
# ## 线3
# plt.vlines(dates[time * 12],0,max(nav_rec_m[portfolios[m]].iloc[time * 12],nav_50_m[portfolios[m]].iloc[time * 12]), colors="c", linestyles="dashed", alpha=0.75)
# ## 线2
# plt.plot(dates, nav_50_m[portfolios[m]].iloc[0:int(time * 12 + after_time * 12) + 1], label="Avg", color="g",linewidth=2, alpha=0.75)
# ## 线1
# plt.plot(dates,nav_rec_m[portfolios[m]].iloc[0:int(time * 12 + after_time * 12) + 1], linestyle=":",label="recommend",color="blue",linewidth=2,alpha=0.75)
#
# # 各曲线间颜色填充
# plt.fill_between(dates[int(time*12+1):int(time*12+after_time*12+1)],0,nav_50_m[portfolios[m]].iloc[int(time*12+1):int(time*12+after_time*12+1)],  color='blue',alpha=0.1)
# plt.fill_between(dates[0:int(time*12+1)],0,nav_50_m[portfolios[m]].iloc[0:int(time*12)+1],  color='green',alpha=0.1)
# plt.show()
