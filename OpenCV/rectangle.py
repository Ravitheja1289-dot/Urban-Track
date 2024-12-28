import cv2
image=cv2.imread('road(1).jpg')
# rectangle drawing
# syntax= image,top-left,bottom-right,line-color, line width
output=image.copy()

rectangle=cv2.rectangle(output,(600,400),(1500,900),(255,0,0),2)
cv2.imshow("Rectangle Image:",rectangle)