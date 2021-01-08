# 模型依赖

# 导入训练好的模型
import joblib

def to_predict(input):
    # 加载模型
    svm_model_all_traing_loaded = joblib.load("svm_model_onethousand_training.pkl")
    # 尝试预测
    res = svm_model_all_traing_loaded.predict(input)
    print(res)
    return res

# PS:基本上移过来保存的模型，写个函数加载并且调方法预测就可以。
#   然后，需要安装模型的依赖库文件。
