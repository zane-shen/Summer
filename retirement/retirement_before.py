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
data=pd.read_hdf('../data/result_retirement.h5')

nav_20_m = data['balanced_re_50'].copy()
nav_50_m = data['balanced_re_50'].copy()
nav_90_m = data['balanced_re_50'].copy()
nav_rec_m = data['balanced_re_50'].copy()

portfolios_na_50 = ['very_conservative_na_50','conservative_na_50','balanced_na_50','aggressive_na_50','very_aggressive_na_50']
portfolios_re_50 = ['very_conservative_re_50','conservative_re_50','balanced_re_50','aggressive_re_50','very_aggressive_re_50']
portfolios_re_50_1 = ['very_conservative_re_50_1','conservative_re_50_1','balanced_re_50_1','aggressive_re_50_1','very_aggressive_re_50_1']
portfolios_av_50 = ['very_conservative_av_50','conservative_av_50','balanced_av_50','aggressive_av_50','very_aggressive_av_50']
# 提取日期
today = datetime.date.today()
# 用户选择RETIREMENT PLAN
plan = 2
# 以下参数为该页面用户输入的
type = int(sys.argv[1])#1
income = int(sys.argv[2])#3000
age = int(sys.argv[3])#28
re_age = int(sys.argv[4])#60
payout = int(sys.argv[5])#2000
after_time = int(sys.argv[6])#30
initial = int(sys.argv[7])#0
topup = int(sys.argv[8])#500
# 以下参数为后台处理的
m = type - 1
time = re_age - age
# 设定时间轴
dates = [today + relativedelta(months=i) for i in range(0, (time + after_time) * 12 + 1)]
# 计算滑动条最大值
avgret =((data[portfolios_na_50[m]].iloc[time * 12 + after_time*12 + 1]/data[portfolios_na_50[m]].iloc[time * 12 + 1])**(1/float(after_time*12)))-1
avgret = (avgret - 0.02/12)/(1+0.02/12)
pv = payout*(1.02**time)* (((1-(1/((1+avgret)**(after_time*12-1))))/avgret)+1)
rec_topup = pv / ((((1 + data[portfolios_av_50[m]].iloc[time * 12 + 1]) ** (time * 12 + 1) - 1) /
                   data[portfolios_av_50[m]].iloc[time * 12 + 1]) - 1)
slidermax = int(rec_topup)+1

# rec_topup初始位置计算
rec_topup = income * 0.2
fv = rec_topup * ((((1 + data[portfolios_av_50[m]].iloc[time * 12 + 1]) ** (time * 12 + 1) - 1) /
                   data[portfolios_av_50[m]].iloc[time * 12 + 1]) - 1)
if fv > pv:
    rec_topup = pv / ((((1 + data[portfolios_av_50[m]].iloc[time * 12 + 1]) ** (time * 12 + 1) - 1) /
                       data[portfolios_av_50[m]].iloc[time * 12 + 1]) - 1)

# 计算rec_initial
fv = rec_topup * ((((1 + data[portfolios_av_50[m]].iloc[time * 12 + 1]) ** (time * 12 + 1) - 1) /
                  data[portfolios_av_50[m]].iloc[time * 12 + 1]) - 1)
if fv > pv:
    rec_topup = pv / ((((1 + data[portfolios_av_50[m]].iloc[time * 12 + 1]) ** (time * 12 + 1) - 1) /
                       data[portfolios_av_50[m]].iloc[time * 12 + 1]) - 1)
    rec_initial = 0
else:
    rec_initial = (pv - fv) / ((1 + data[portfolios_av_50[m]].iloc[time * 12 + 1]) ** (time*12))

# projection曲线各点计算
nav_20_m.iloc[0] = initial
nav_50_m.iloc[0] = initial
nav_90_m.iloc[0] = initial
nav_rec_m.iloc[0] = rec_initial
nav_50_m.iloc[1: time*12+1] = initial*data[portfolios_na_50[m]].iloc[1: time*12+1]+topup*data[portfolios_re_50_1[m]].iloc[1: time*12+1]
nav_rec_m.iloc[1: time*12+1] = rec_initial*data[portfolios_na_50[m]].iloc[1: time*12+1]+rec_topup*data[portfolios_re_50_1[m]].iloc[1: time*12+1]

for n in range(time*12+1,time*12+1+after_time*12):
    nav_50_m.iloc[n] = nav_50_m.iloc[n - 1] * (data[portfolios_re_50[m]].iloc[n] + 1) - payout * (1.02 ** time)*((1+0.02/12)**(n-time*12))
    nav_rec_m.iloc[n] = nav_rec_m.iloc[n - 1] * (data[portfolios_re_50[m]].iloc[n] + 1) - payout * (1.02 ** time)*((1+0.02/12)**(n-time*12))
    if nav_50_m.iloc[n] < 0:
        nav_50_m.iloc[n] = 0
    if nav_rec_m.iloc[n] < 0:
        nav_rec_m.iloc[n] = 0

print int(slidermax)
print int(rec_initial)
print int(rec_topup+1)
print (time * 12 + after_time * 12) + 1

print 'flag'#线1
for n in range(0,(time * 12 + after_time * 12) + 1):
    print int(nav_rec_m.iloc[n])

print 'flag'#线2
for n in range(0,(time * 12 + after_time * 12) + 1):
    print int(nav_50_m.iloc[n])

# # 曲线绘制（dates为横坐标，nav为纵坐标）
# ##线4
# plt.hlines(pv, dates[0], dates[time * 12], colors="c", linestyles="dashed", alpha=0.75)
# ## 线3
# plt.vlines(dates[time * 12], 0,max(nav_rec_m.iloc[time * 12],nav_50_m.iloc[time * 12]), colors="c", linestyles="dashed", alpha=0.75)
# ## 线2
# plt.plot(dates, nav_50_m.iloc[0:int(time * 12 + after_time * 12) + 1], label="Avg", color="g",linewidth=2, alpha=0.75)
# ## 线1
# plt.plot(dates,nav_rec_m.iloc[0:int(time * 12 + after_time * 12) + 1], linestyle=":",label="recommend",color="blue",linewidth=2,alpha=0.75)
#
# # 各曲线间颜色填充
# plt.fill_between(dates[int(time*12+1):int(time*12+after_time*12+1)],0,nav_50_m.iloc[int(time*12+1):int(time*12+after_time*12+1)],  color='blue',alpha=0.1)
# plt.fill_between(dates[0:int(time*12+1)],0,nav_50_m.iloc[0:int(time*12)+1],  color='green',alpha=0.1)
# plt.show()
