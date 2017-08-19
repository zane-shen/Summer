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
slidermax_retirement = pd.read_hdf('../data/slidermax_retirement.h5')
portfolios_na_50 = ['very_conservative_na','conservative_na','balanced_na','aggressive_na','very_aggressive_na']
portfolios_av_50 = ['very_conservative_av','conservative_av','balanced_av','aggressive_av','very_aggressive_av']

# 用户选择RETIREMENT PLAN
plan = 2
# 以下参数为该页面用户输入的
type = int(sys.argv[1])#1
age = int(sys.argv[2])#28
re_age = int(sys.argv[3])#60
payout = int(sys.argv[4])#2000
after_time = int(sys.argv[5])#30


# 以下参数为后台处理的
m = type - 1
time = re_age - age

#计算滑动条最大值
avgret =((slidermax_retirement[portfolios_na_50[m]].iloc[time * 12 + after_time*12 + 1]/slidermax_retirement[portfolios_na_50[m]].iloc[time * 12 + 1])**(1/float(after_time*12)))-1
pv = payout*(1.02**time)* (((1-(1/((1+avgret)**(after_time*12-1))))/avgret)+1)
rec_topup = pv / ((((1 + slidermax_retirement[portfolios_av_50[m]].iloc[time * 12 + 1]) ** (time * 12 + 1) - 1) /
                   slidermax_retirement[portfolios_av_50[m]].iloc[time * 12 + 1]) - 1)
slidermax = int(rec_topup+1)
print(slidermax)
