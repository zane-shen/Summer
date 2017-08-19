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

# 用户选择RETIREMENT PLAN
plan = 2
# 以下参数为该页面用户输入的
type = 1
purchase = 100000
pur_time = 8
# 以下参数为后台处理的
m = type - 1
time = pur_time

# 计算滑动条最大值
pv = purchase * (1.02 ** pur_time)
rec_topup = pv / ((((1 + avgret_50_m[portfolios[m]].iloc[pur_time * 12 + 1]) ** (pur_time * 12 + 1) - 1) /
                       avgret_50_m[portfolios[m]].iloc[pur_time * 12 + 1]) - 1)
slidermax = int(rec_topup+1)
print(slidermax)