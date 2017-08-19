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
data=pd.read_hdf('D:/data/result_generalsaving.h5')

nav_20_m = data['balanced_re_50'].copy()
nav_50_m = data['balanced_re_50'].copy()
nav_90_m = data['balanced_re_50'].copy()
nav_rec_m = data['balanced_re_50'].copy()

portfolios_na_20 = ['very_conservative_na_20','conservative_na_20','balanced_na_20','aggressive_na_20','very_aggressive_na_20']
portfolios_na_50 = ['very_conservative_na_50','conservative_na_50','balanced_na_50','aggressive_na_50','very_aggressive_na_50']
portfolios_na_90 = ['very_conservative_na_90','conservative_na_90','balanced_na_90','aggressive_na_90','very_aggressive_na_90']
portfolios_re_20 = ['very_conservative_re_20','conservative_re_20','balanced_re_20','aggressive_re_20','very_aggressive_re_20']
portfolios_re_50 = ['very_conservative_re_50','conservative_re_50','balanced_re_50','aggressive_re_50','very_aggressive_re_50']
portfolios_re_90 = ['very_conservative_re_90','conservative_re_90','balanced_re_90','aggressive_re_90','very_aggressive_re_90']

# 提取日期
today = datetime.date.today()
# 用户选择general saving模块
plan = 1
# 以下参数为该页面用户输入的
type = 5
time = 10
initial = 10000
topup = 0
# 以下参数为后台处理的
m = type - 1

# 设定时间轴
dates = [today + relativedelta(months=i) for i in range(0, (time ) * 12 + 1)]
# projection曲线各点计算
nav_20_m.iloc[0] = initial
nav_50_m.iloc[0] = initial
nav_90_m.iloc[0] = initial
nav_rec_m.iloc[0] = initial

nav_20_m.iloc[1: time*12+1] = initial*data[portfolios_na_20[m]].iloc[1: time*12+1]+topup*data[portfolios_re_20[m]].iloc[1: time*12+1]
nav_50_m.iloc[1: time*12+1] = initial*data[portfolios_na_50[m]].iloc[1: time*12+1]+topup*data[portfolios_re_50[m]].iloc[1: time*12+1]
nav_90_m.iloc[1: time*12+1] = initial*data[portfolios_na_90[m]].iloc[1: time*12+1]+topup*data[portfolios_re_90[m]].iloc[1: time*12+1]
nav_rec_m.iloc[1: time*12+1] = initial*data['deposit_na'].iloc[1: time*12+1]+topup*data['deposit_re'].iloc[1: time*12+1]
## 线1
plt.plot(dates,nav_20_m.iloc[0:int(time*12)+1],label="20% chance",linewidth=1,alpha=0.5)
## 线2
plt.plot(dates,nav_50_m.iloc[0:int(time*12)+1],label="Avg",color="g",linewidth=2,alpha=0.75)
## 线3
plt.plot(dates,nav_90_m.iloc[0:int(time*12)+1],label="90% chance",linewidth=1,alpha=0.5)
## 线4
plt.plot(dates,nav_rec_m.iloc[0:int(time*12)+1],label="Deposit", linewidth=1, alpha=0.5)

# 各曲线间颜色填充
plt.fill_between(dates,nav_20_m.iloc[0:int(time*12)+1],nav_50_m.iloc[0:int(time*12)+1],  color='blue',alpha=0.1)
plt.fill_between(dates,nav_50_m.iloc[0:int(time*12)+1],nav_90_m.iloc[0:int(time*12)+1],  color='green',alpha=0.1)
plt.show()