Inheritance concept in python and cpp

consider example in python and cpp as below

case 1: All public variable and not same public variable in derived class

```Python                               
class A:
    def __init__(self):
        self.name="nirajan"
    def display(self):
        print("name is",self.,"from a")
    def change_name(self,new_name):
        self.name=new_name+'added in a'

class B(A):
    def __init__(self):
        self.doc="rame"
    def display_a(self):
        self.display()
        print("name is",self.name,"from a")
        print("doc is",self.doc,"from b")
    def change_name_b(self,new_name):
        self.name=new_name +'added in b'
        self.change_name(new_name)
        self.doc=new_name+'added in b'

b=B()
b.display_b()
b.change_name_b("newname")
b.display_b()


        
```
The equivalent code in cpp is as below
```cpp
#include <iostream>
using namespace std;
class A{
    public:
        string name;
        A(){
            name="nirajan";
        }
        void display(){
            cout<<"name is "<<name<<" from a"<<endl;
        }
        void change_name(string new_name){
            name=new_name+" added in a";
        }
};

class B: public A{
    public:
        string doc;
        B(){
            doc="rame";
        }
        void display_a(){
            display();
            cout<<"name is "<<name<<" from a"<<endl;
            cout<<"doc is "<<doc<<" from b"<<endl;
        }
        void change_name_b(string new_name){
            name=new_name+" added in b";
            change_name(new_name);
            doc=new_name+" added in b";
        }
};
int main(){
    B b;
    b.display_a();
    b.change_name_b("newname");
    b.display_a();
    return 0;
}
```

What happpen Here?

Better one:
When we execute display_a() then first it will check if display_a() function is in class B if found it will execute else it will look for the function in class A . Since display_a() function is in class B so it will execute that function. Now in display_a() function first line of code is display() then it will look for the function in class B if not found it will look for the function in class A and since it is not in class B it will find it in class A and since it is in class A then it will execute the function of class A.

In python ,
While executing display function we need name variable. So it will first look for the variable in class B if not found it will look for the variable in class A . 

But in cpp,
While executing display function we need name variable. So it will first look for the variable in the class that function actually belongs to. Here display function belongs to class A so it will use find the variable in class A not in class B as in python.



Now after finding the variable the display function will print the variable value. In this case both python and cpp will print the same value.as variable name is not present in class B so python will look for the variable in class A and find it in class A and print and cpp will by default look for the variable in class A as display function belongs to class A and print the value of variable of class A


After display() function the next line of code is `cout<<"name is "<<name<<" from a"<<endl;` here it is function of class B so ,

CPP will look for variable name in class B first as it is in the function of class B if not found it will look for the variable in class A.


Python will look for the derived class always first so it will look for the variable name in class B first if not found it will look for the variable in class A.

then it will print the value of variable name of class A

After that the next line of code is `cout<<"doc is "<<doc<<" from b"<<endl;` here it is function of class B

so CPP will try to find the variable doc in class B first as it is in the function of class B if not found it will look for the variable in class A.Here it will find the variable in class B and print the value of variable doc of class B

and python will look for the derived class always first so it will look for the variable doc in class B first if not found it will look for the variable in class A.Here it will find the variable in class B and print the value of variable doc of class B



case 2: Public variable with repetition in derived class

```Python
class A:
    def __init__(self):
        self.name="nirajan"
    def display(self):
        print("name is",self.name,"from a")
    def change_name(self,new_name):
        self.name=new_name+' added in a'
class B(A):
    def __init__(self):
        self.name="rame"
    def display_b(self):
        self.display()
        print("name is",self.name,"from b")

    def change_name_b(self,new_name):
        self.name=new_name +' added in b'
        self.change_name(new_name)

b=B()
b.display_b()
b.change_name_b("newname")
b.display_b()
```

The equivalent code in cpp is as below
```cpp
#include <iostream>
using namespace std;
class A{
    public:
        string name;
        A(){
            name="nirajan";
        }
        void display(){
            cout<<"name is "<<name<<" from a"<<endl;
        }
        void change_name(string new_name){
            name=new_name+" added in a";
        }
};

class B: public A{
    public:
        string name;
        B(){
            name="rame";
        }
        void display_a(){
            display();
            cout<<"name is "<<name<<" from b"<<endl;
        }
        void change_name_b(string new_name){
            name=new_name+" added in b";
            change_name(new_name);
        }
};

int main(){
    B b;
    b.display_a();
    b.change_name_b("newname");
    b.display_a();
    return 0;
}
```

What happpen Here?
Here python and c++ behave differently. 

In python,
In python init first set value of name to rame . When we call display_b function then the first line of code `self.display()` will call display function . The function will reference the function of class A but the variable name will reference the variable of class B because in python it first look for the variable in the current class if not found it will look for the variable in the base class. So when we call display function it will print name is rame from a. Then the next line of code will print name is rame from b. So the output will be 

After then `print("name is",self.name,"from a")` will will print name rame from class B.


similary while changing name,
When we call change_name_b then the first line of code `self.name=new_name +' added in b'` will change the value of name in class B to newname added in b. 

Then the next line of code `self.change_name(new_name)` will call change_name function of class A. Ifirst it search the change_name function is available in class B if not found it will look for the function in class A. Similarly while executing the function change_name it will first look for the variable name in class B if not found it will look for the variable in class A. So here it will find the variable name in class B and change the value of name in class B to newname added in a.



In cpp,
In cpp when we call display_a() function then first it check if the function is available in class B since it is fount in class B so it will execute that function . Again the first line of code is `display()` then it again check if display function is available in class B if not found it will look for the function in class A. an dfind it in class A so it will execute the class A function.Bow while executing the function of class then it will use the variable of class A  not of B as of python.
Similarly the next line of code is `cout<<"name is "<<name<<" from b"<<endl;` here it is function of class B so it will use the variable of class B.


Similarly while changing name,
When we call change_name_b function then first line of code is `name=new_name+" added in b";` here it will use the variable of class B because it is in the function of class B. Then the next line of code is `change_name(new_name);` here it will look for the function in class B if not found it will look for the function in class A and find it in class A so it will execute the function of class A. Now while executing the function of class A it will use the variable of class A not of B as in python.




case 3 : Private variable only in base class with no same variable in derived class

```Python
class A:
    def __init__(self):
        self.__name="nirajan"
    def display(self):
        print("name is",self.__name,"from a")
    def change_name(self,new_name):
        self.__name=new_name+' added in a'

class B(A):
    def __init__(self):
        self.doc="rame"
    def display_b(self):
        self.display()
        print("doc is",self.doc,"from b")
        print("name is",self.__name,"from b") # will give error
    def change_name_b(self,new_name):
        self.__name=new_name +' added in b' # will give error
        self.change_name(new_name)
        self.doc=new_name+' added in b'

b=B()
b.display_b()
b.change_name_b("newname")
b.display_b()
```

The equivalent code in cpp is as below
```cpp
#include <iostream>
using namespace std;
class A{
    private:
        string name;
    public:
        A(){
            name="nirajan";
        }
        void display(){
            cout<<"name is "<<name<<" from a"<<endl;
        }
        void change_name(string new_name){
            name=new_name+" added in a";
        }
};
class B: public A{
    public:
        string doc;
        B(){
            doc="rame";
        }
        void display_a(){
            display();
            cout<<"doc is "<<doc<<" from b"<<endl;
            cout<<"name is "<<name<<" from b"<<endl; // will give error
        }
        void change_name_b(string new_name){
            name=new_name+" added in b"; // will give error
            change_name(new_name);
            doc=new_name+" added in b";
        }
};
int main(){
    B b;
    b.display_a();
    b.change_name_b("newname");
    b.display_a();
    return 0;
}
```

What happpen Here?
Consider we are running  display_a function of class B. Then first line of code is display() which means it will now search for display function in class B if not found it will look for the function in class A and find it in class A and execute it.In display() function ther we display the private variable of class A because we are using the function of class A. But the next line of coe    
 `cout<<"doc is"<<doc<<" from b"<<endl;` will print the variable of class B because it is in the function of class B. But the next line of code is `cout<<"name is "<<name<<" from b"<<endl;`. This will throw error because  it wll search if name is in class B if not found it will look for same variable class A but it is private variable so it is not visible to class B function so it cant see the declaration of name in class A and throw error as a is not declared.


Similarly while changing name,
When we call change_name_b function then first line of code is `name=new_name+" added
    in b";` here it will search for the variable name in class B if not found it will look for the variable in class A but it is private variable so it is not visible to class B function so it cant see the declaration of name in class A and throw error as a is not declared. Then the next line of code is `change_name(new_name);` here it will look for the function in class B if not found it will look for the function in class A and find it in class A so it will execute the function of class A. Now while executing the function of class A it will use the variable of class A not of B as in python.


case 4: Private variable in base class and same private variable in derived class

```Python
class A:
    def __init__(self):
        self.__name="nirajan"
    def display(self):
        print("name is",self.__name,"from a")
    def change_name(self,new_name):
        self.__name=new_name+' added in a'

class B(A):
    def __init__(self):
        self.__name="rame"
    def display_b(self):
        self.display()
        print("name is",self.__name,"from b")
    def change_name_b(self,new_name):
        self.__name=new_name +' added in b'
        self.change_name(new_name)
b=B()
b.display_b()
b.change_name_b("newname")
b.display_b()
```

The equivalent code in cpp is as below
```cpp
#include <iostream>

using namespace std;
class A{
    private:
        string name;
    public:
        A(){
            name="nirajan";
        }
        void display(){
            cout<<"name is "<<name<<" from a"<<endl;
        }
        void change_name(string new_name){
            name=new_name+" added in a";
        }
};
class B: public A{
    private:
        string name;
    public:
        B(){
            name="rame";
        }
        void display_a(){
            display();
            cout<<"name is "<<name<<" from b"<<endl;
        }
        void change_name_b(string new_name){
            name=new_name+" added in b";
            change_name(new_name);
        }
};

int main(){
    B b;
    b.display_a();
    b.change_name_b("newname");
    b.display_a();
    return 0;
}
```

What happpen Here?

In cpp,
when we call display_a() function then first it check if the function is available in class B since it is fount in class B so it will execute that function if its private then if function is called outside from the class then it cane be seen but if it is called inside the class then it can be seen but here it is public so we can see it from both inside class and outside. It see if display_a function is available in class B . Yes display_a function is available then in class B it first line of code is `display()` then it again check if display function is available in class B if not found it will look for the function in class A.As it is not in B and only in A so it will execute the function of class A. While executing the function of class A it will use the variable of class A not of B as in python. Similarly the next line of code is ``cout<<"name is "<<name<<" from b"<<endl;` here it is function of class B so it will use the variable of class B. 


In case of python,
while executing display function like in case 2 it will first look for class B __name variable is present in class B but it is private so it will not be visible as we are executing the function of class A. So we will now look for the variable in class A and find it in class A and print the value of class A variable. Then the next line of code will print the value of class B variable as it is in the function of class B.

Similarly while changing name,
When we call change_name_b function then first line of code is `name=new_name+" added in b";` here it will use the variable of class B because it is in the function of class B. Then the next line of code is `change_name(new_name);` here it will look for the function in class B if not found it will look for the function in class A and find it in class A so it will execute the function of class A. Now while executing the function of class A it will use the variable of class A not of B as in python.




Similar for function if it is private then it can be seen only inside the class not outside