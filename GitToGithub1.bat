@echo off

echo ���ڴ�����֧...
git checkout --orphan lb

echo �������ȫ���ļ�...
git add .

echo �����ύ...
git commit -am "latest"

echo ����ɾ��ԭ��֧...
git branch -D main

echo �����������ַ�֧...
git branch -M main

echo ��������...
git push -f origin main

pause