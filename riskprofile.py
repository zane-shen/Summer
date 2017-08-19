#!/usr/bin/python
#coding:utf-8
import pandas as pd
import sys
#from pandas_datareader import data as web
import numpy as np
import matplotlib.pyplot as plt
import datetime
from dateutil.relativedelta import relativedelta
from numpy import cumsum, log, polyfit, sqrt, std, subtract
from numpy.random import randn
import heapq as hq
import math
#用户输入RISK PROFILE 答案

PS = ["Conservative", "Moderate", "Balanced", "Progressive", "Aggressive"]
RC = [
    "You are on the way of building your wealth and your financial condition could be harmed by short-term fluctuations.",
    "You are on the way of building your wealth and your financial condition could be impacted by short-term fluctuations.",
    "Your financial condition is healthy and you are able to endure short-term fluctuations.",
    "Your financial condition is good and you can take more risks and aim for higher returns.",
    "Your financial condition is strong and you can take higher risks and aim for higher returns."]

RA = ["You are willing to forego a large part of potential return for a very steady growth.",
      "You are willing to forego some potential return for a steadier growth.",
      "You want a balance position between risks and returns.",
      "You are willing to take more risks for higher potential returns.",
      "You are willing to take greater risks for higher potential returns."]


def showport(a, c, i, p):
    a -= 1
    c -= 1
    i -= 1
    p -= 1

    if (a < 2 and c < 2) or (a > 2 and c > 2):
        Firstline = RA[a]
        Secondline = RC[c]
        Transition_1 = "Moreover,"
    elif (a > 2 and c < 2):
        Firstline = RA[a]
        Secondline = RC[c]
        Transition_1 = "On the other hand,"

    elif a < 2 and c > 2:
        Firstline = RC[c]
        Secondline = RA[a]
        Transition_1 = "On the other hand,"
    else:
        Firstline = RA[a]
        Secondline = RC[c]
        Transition_1 = "Meanwhile,"

    if i == 0:
        if a >= 2 and c >= 2:
            Transition_2 = "However, your investment period is shorter than 2 years. To protect you from losses caused by short-term fluctuations, the portfolio we recommend for you is:"
        else:
            Transition_2 = "On top of all, your investment period is shorter than 2 years. To protect you from losses caused by short-term fluctuations, the portfolio we recommend for you is:"
    else:
        Transition_2 = "Accounting for your risk appetite, risk capacity and investment period, the portfolio we recommend for you is:"
    print Firstline
    print Transition_1+Secondline.lower()+Transition_2
    print PS[p]


a = np.zeros(8)
a[0] = int(sys.argv[1])*2-1#第二个参数开始
a[1] = int(sys.argv[2])*2-1
a[2] = int(sys.argv[3])*2-1
a[3] = int(sys.argv[4])*2-1
a[4] = int(sys.argv[5])*2-1
a[5] = int(sys.argv[6])*2-1
a[6] = int(sys.argv[7])*2-1
a[7] = int(sys.argv[8])
# 计算每一部分得分
part_1 = sum(a[0:2])
part_2 = sum(a[2:7])
part_3 = a[7]

# 计算最终风险评级

if part_1<=5:
    part_1_level= 1
elif part_1<=7:
    part_1_level= 2
elif part_1<=10:
    if part_2>=15:
        part_1_level = 3
    else:
        part_1_level = 2
elif part_1 <=14:
    part_1_level= 4
else:
    part_1_level = 5

if part_2<=5:
    part_2_level=1
elif part_2<=13:
    part_2_level=2
elif part_2<=27:
    if part_1<10:
        part_2_level=2
    else:
        part_2_level=3
elif part_2<=35:
    part_2_level= 4
else:
    part_2_level= 5


if part_3 ==1:
    part_3_level=2
elif part_3 ==2:
    part_3_level=4
elif part_3 ==3:
    part_3_level= 4
else:
    part_3_level= 5
#计算最终风险等级
result= min(part_1_level,part_2_level,part_3_level)


print(result)
print(part_1_level)
print(part_2_level)
print(part_3_level)
showport(part_1_level,part_2_level,part_3_level,result)
