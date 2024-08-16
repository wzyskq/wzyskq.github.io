import sys
from PIL import Image  # pip3 install pillow

origin_path = sys.argv[1].split('\\')[-1]
origin_name = origin_path.split('.')[0]
output_path = f'{origin_name}.pro.jpg'

original_image = Image.open(origin_path)
original_image.convert('RGB')
original_image.save(output_path, optimize=True, quality=100, progressive=True)
