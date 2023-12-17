def find_definitions(parsed_sentence):
    analyzed_sentence = []
    definitions = [] # Массив определений (словами)
    def_positions = [] #массив позиций определений в тексте

    for elem in range(len(parsed_sentence)):

        analyzed_sentence.append(None)
		
        #Определение соседних слов
        word=parsed_sentence[elem]
        word_before=None
        word_after=None
        if elem != 0:
            word_before=parsed_sentence[elem-1]
        if elem+1 != len(parsed_sentence):
            word_after=parsed_sentence[elem+1]

        try:
            if((word.tag.POS =='ADJF' or word.tag.POS == "ADJS") and word_after.tag.POS=='NOUN'):
                definitions.append(word.word)
                def_positions.append(elem)
                 
            if(word.tag.POS=='NUMR' and word_after.tag.POS=='NOUN'):
                definitions.append(word.word)
                def_positions.append(elem)
         
        except AttributeError:
            pass

    #Формирование массива ключей
    for elem in range(len(parsed_sentence)):
        if(elem in def_positions):
            analyzed_sentence[elem]="definition"

    return analyzed_sentence