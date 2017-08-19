#!/usr/bin/python
#coding:utf-8
import sys
import pandas as pd
from pandas_datareader import data as web
import numpy as np
import matplotlib.pyplot as plt
import datetime
from dateutil.relativedelta import relativedelta
from numpy import cumsum, log, polyfit, sqrt, std, subtract
from numpy.random import randn
import heapq as hq
import math

# 提取数据

avgret_50_m = pd.read_hdf('D:/data/avgret_50_m.h5')
portfolios = ['very_conservative','conservative','balanced','aggressive','very_aggressive']

# 用户选择education plan
plan = 3
# 以下参数为该页面用户输入的
type = 1
purchase = 100000
pur_time = 8
income = 5000
# 以下参数为后台处理的
m = type - 1
time = pur_time

# rec_topup初始位置计算
rec_topup = income * 0.2
pv = purchase*(1.02**pur_time)
fv = rec_topup * ((((1 + avgret_50_m[portfolios[m]].iloc[pur_time * 12 + 1]) ** (pur_time * 12 + 1) - 1) /
                       avgret_50_m[portfolios[m]].iloc[pur_time * 12 + 1]) - 1)
if fv > pv:
    rec_topup = pv / ((((1 + avgret_50_m[portfolios[m]].iloc[pur_time * 12 + 1]) ** (pur_time * 12 + 1) - 1) /
                                 avgret_50_m[portfolios[m]].iloc[pur_time * 12 + 1]) - 1)

print(rec_topup)
