import sys
from PIL import Image  # pip3 install pillow

origin_path = sys.argv[1].split('\\')[-1]
origin_name = origin_path.split('.')[0]
output_path = f'{origin_name}.jpg'

original_image = Image.open(origin_path)
original_image.convert('RGB').save(output_path)
