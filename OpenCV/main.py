import cv2
image=cv2.imread('road(1).jpg')
h,w=image.shape[:2]
print("Height={}, Width={}".format(h,w))

# extracting the rgb values
(B, G, R) = image[100, 100]
print("R = {}, G = {}, B = {}".format(R, G, B))

B = image[100, 100, 0]
print("B = {}".format(B))
# cv2.imshow("original Image:",image)

# resize() 
resize = cv2.resize(image, (500, 500))
cv2.imshow("Resized Image", resize)
cv2.waitKey(0)

