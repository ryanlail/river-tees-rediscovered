import cv2 

##############################################################

# These parameter values are indicative. You should choose your own 
# according to properties of the method you want to demonstrate

h = 15
templateWindowSize = 7
searchWindowSize = 101

##############################################################

img = cv2.imread('dice-highNoise.png')

#dst = cv2.fastNlMeansDenoisingColored(img, None, h, h, templateWindowSize, searchWindowSize)

dst = cv2.GaussianBlur(img,(17,17),0)

cv2.imwrite('denoised.png', dst) 


