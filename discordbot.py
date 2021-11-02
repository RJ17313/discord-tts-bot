import discord, logging
from gtts import gTTS
from discord.ext import commands
from discord.ext.commands.core import command


logging.basicConfig(level=logging.INFO)

bot = commands.Bot(command_prefix="t.", help_command=None)

vc = ""
accent = "com"
language = "en"

def convertTuple(tup):
    str = " ".join(tup)
    return str

def findLanguage(arg):
    if(arg == "en"):
        languagesetto = "Your language was set to English!"

    elif(arg == "fr"):
        languagesetto = "Your language was set to French!"

    elif(arg == "zh-CN"):
        languagesetto = "Your language was set to Mandarin China Mainland!"

    elif(arg == "zh-TW"):
        languagesetto = "Your language was set to Mandarin Taiwan!"

    elif(arg == "pt"):
        languagesetto = "Your language was set to Portuguese!"

    elif(arg == "es"):
        languagesetto = "Your language was set to Spanish!"
    else:
        languagesetto = "None found, defaulting language to English!"
    return languagesetto

def findAccent(arg):
    if(arg == "com.au"):
        accentsetto = "Your accent was set to Australian!"

    elif(arg == "co.uk"):
        accentsetto = "Your accent was set to British!"

    elif(arg == "com"):
        accentsetto = "Your accent was set to American!"

    elif(arg == "ca"):
        accentsetto = "Your accent was set to Canadian!"

    elif(arg == "co.in"):
        accentsetto = "Your accent was set to Indian!"

    elif(arg == "ie"):
        accentsetto = "Your accent was set to Irish!"

    elif(arg == "co.za"):
        accentsetto = "Your accent was set to South African!"

    elif(arg == "fr"):
        accentsetto = "Your accent was set to French!"

    elif(arg == "com.br"):
        accentsetto = "Your accent was set to Brazilian!"

    elif(arg == "pt"):
        accentsetto = "Your accent was set to Portualian!"

    elif(arg == "es"):
        accentsetto = "Your accent was set to Spanish!"
    else:
        accentsetto = "None found, defaulting to American!"
    return accentsetto

@bot.event
async def on_ready():
    print("bot has logged in")

@bot.command()
async def join(ctx):
    global vc
    channel = ctx.author.voice.channel
    vc = await channel.connect()

@bot.command()
async def help(ctx):
    with open("languages.txt", "r") as file:
        contents = file.read()
    await ctx.channel.send(contents)
    with open("accents.txt", "r") as file:
        contents = file.read()
    await ctx.channel.send(contents)

@bot.command()
async def leave(ctx):
    global vc
    await vc.disconnect()

@bot.command()
async def message(ctx, *args):
    global vc, language, accent
    voiceSample = convertTuple(args)
    tts = gTTS(text=voiceSample, lang=language, tld=accent)
    tts.save("voice.mp3")

    vc.play(discord.FFmpegPCMAudio("voice.mp3"))

@bot.command()
async def languageset(ctx, arg):
    global language
    lang = findLanguage(arg)
    if(lang != "None found, defaulting language to English!"):
        language = arg
    else:
        language = "en"

    await ctx.channel.send(lang)

@bot.command()
async def accentset(ctx, arg):
    global accent
    acc = findAccent(arg)
    if(acc != "None found, defaulting to American!"):
        accent = arg
    else:
        accent = "com"
    
    await ctx.channel.send(acc)

with open("token.txt", "r") as file:
    token = file.read()
bot.run(token)