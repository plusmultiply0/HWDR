# 模型依赖
import numpy as np
# 导入训练好的模型
import joblib

# 预处理函数
# 整齐化，上下|左右相同
def tobesame(img,x1,x2,y1,y2):#     x2>x1,y2>y1
    if(28-x2)>x1:
        x1 = 2+28-x2-x1
        img[:x1]=0
    if (28-x2)<x1:
        x2 = -2+28-x2-x1
        img[x2:]=0
    if (28-y2)>y1:
        y1 = 2+28-y2-y1
        img[:,:y1]=0
    if (28-y2)<y1:
        y2 = -2+28-y2-y1
        img[:,y2:]=0
    img = img[y1:y2, x1:x2]
    # print(img.shape)
    return img
# 居中图片,添加填充
def pad_image(img, pad_t, pad_r, pad_b, pad_l):
    height, width = img.shape
    print(img.shape)
    # Adding padding to the left side.
    pad_left = np.zeros((height, pad_l), dtype = np.int)
    img = np.concatenate((pad_left, img), axis = 1)

    # Adding padding to the top.
    pad_up = np.zeros((pad_t, pad_l + width))
    img = np.concatenate((pad_up, img), axis = 0)

    # Adding padding to the right.
    pad_right = np.zeros((height + pad_t, pad_r))
    img = np.concatenate((img, pad_right), axis = 1)

    # Adding padding to the bottom
    pad_bottom = np.zeros((pad_b, pad_l + width + pad_r))
    img = np.concatenate((img, pad_bottom), axis = 0)
    return img

# 裁剪图片
def center_image(img):
    # 边缘处理，上下左右两行归0
    img[:2] = 0
    img[-2:] = 0
    img[:, :2] = 0
    img[:, -2:] = 0

    col_sum = np.where(np.sum(img, axis=0) > 0)
    row_sum = np.where(np.sum(img, axis=1) > 0)
    y1, y2 = row_sum[0][0], row_sum[0][-1]
    x1, x2 = col_sum[0][0], col_sum[0][-1]
    print(x1, x2, y1, y2)

    cropped_image = tobesame(img, x1, x2, y1, y2)
    print(cropped_image.shape)

    zero_axis_fill = (28 - cropped_image.shape[0])
    one_axis_fill = (28 - cropped_image.shape[1])
    top = int(zero_axis_fill / 2)
    bottom = zero_axis_fill - top
    left = int(one_axis_fill / 2)
    right = one_axis_fill - left
    print(top, bottom, left, right)

    padded_image = pad_image(cropped_image, top, left, bottom, right)
    print('shape '+str(padded_image.shape[0])+' '+str(padded_image.shape[1]))
    return padded_image


def to_predict(input):
    # 加载模型
    # svm_model_all_traing_loaded = joblib.load("svm_model_onethousand_training.pkl")
    sgd_model_all_train_load = joblib.load("sgd_model_all_training.pkl")
    #预处理
    # 黑底白字+居中
    deal_input = center_image(input).reshape(1,784)

    # 尝试预测
    # res = svm_model_all_traing_loaded.predict(deal_input)
    res = sgd_model_all_train_load.predict(deal_input)
    print(res)
    # score = svm_model_all_traing_loaded.decision_function(deal_input)
    score = sgd_model_all_train_load.decision_function(deal_input)
    print(score[0])
    joblib.dump(sgd_model_all_train_load, "sgd_model_all_training.pkl")
    return score[0]

# PS:基本上移过来保存的模型，写个函数加载并且调方法预测就可以。
#   然后，需要安装模型的依赖库文件。
