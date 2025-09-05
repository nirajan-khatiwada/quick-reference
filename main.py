from langchain.llm import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain

# Initialize the language model
llm = OpenAI(temperature=0.7)
# Define the prompt templateq
template = PromptTemplate(
    input_variables=["topic"],
    template="Write a short poem about {topic}.",
)

# Create the LLM chain
chain = LLMChain(llm=llm, prompt=template)