import numpy as np
import cv2
import sys
import os

def watermark_image(image_location, stamp_location, stamp_mask_location, file_name):

    image_directory = "photos/tmp/"
    stamp_directory = "photos/stamps/"

    img = cv2.imread(image_directory + image_location, cv2.IMREAD_COLOR);
    mask = cv2.imread(stamp_directory + stamp_mask_location, cv2.IMREAD_GRAYSCALE)
    du_logo = cv2.imread(stamp_directory + stamp_location, cv2.IMREAD_COLOR)

    if not img is None:

        rows, cols, channels = du_logo.shape
        #  size of region of interest extracted from image
        roi = img[0:rows, 0:cols]

        #  black out region of logo in roi
        img_bg = cv2.bitwise_and(roi, roi, mask = mask)

        # isolate the purple bit (remove white) with inverse mask (so bg is black and removed)
        logo_fg = cv2.bitwise_and(du_logo, du_logo, mask = cv2.bitwise_not(mask))


        # add images together and put back in original image
        dst = cv2.add(img_bg, logo_fg)
        img[0:rows, 0:cols] = dst


        # write inverted image to file

        #Undone resizeing for the demo
        resized = img #cv2.resize(img, (1000,1000), interpolation = cv2.INTER_AREA)

        try:
            os.remove(file_name)
        except:
            pass

        cv2.imwrite(file_name + ".png", resized)
        os.rename(file_name + ".png", file_name)

    else:
        print("No image file successfully loaded.")

if __name__ == "__main__":
    original_image_name = sys.argv[1] # just image name
    stamp_name = "Sculpture" + sys.argv[2] + ".png"
    stamp_mask_name = "Sculpture" + sys.argv[2] + "Mask.png"
    file_name = sys.argv[3] # photos/user_id/sculpture_id/1

    watermark_image(original_image_name, stamp_name, stamp_mask_name, file_name)
