def find_adverbials(parsed_sentence):
    adverbials = [] # Массив обстоятельств (словами)
    analyzed_sentence = []
    adv_positions = [] # массив позиций обстоятельств в тексте

    for elem in range(len(parsed_sentence)):

        #Определение соседних слов
        word=parsed_sentence[elem]
        word_before=None
        word_after=None
        if elem != 0:
            word_before=parsed_sentence[elem-1]
        if elem+1 != len(parsed_sentence):
            word_after=parsed_sentence[elem+1]

        try:
            #Существительное в косвенном падеже с предлогом = обстоятельство
            #Возможно наличие перечня прилагательных между существительным в косвенном падеже и предлогом
            #Числительное + существительное в косвенном падеже = обстоятельство
            #Наречие до существительного в косвенном падеже = обстоятельство
            if word.pos == "NOUN" and word.tag.case != "nomn":  

                #Сущ. с предлогом
                if word_before.pos == "PREP": 
                    adverbials.append(word_before.word+" "+word.word)
                    adv_positions.append(elem-1)
                    adv_positions.append(elem)

                #Предлог - перечень прилагательных - существительное  
                i=1
                while (parsed_sentence[elem-i].pos == "ADJF" or parsed_sentence[elem-i].pos == "PREP") and i<len(parsed_sentence):
                    if parsed_sentence[elem-i].pos == "PREP":
                        adverbials.append(parsed_sentence[elem-i].word+" "+word.word)
                        adv_positions.append(elem-i)
                        adv_positions.append(elem)
                        break
                    i += 1

                #Числительное + существительное
                if word_before.pos == "NUMR":
                    adverbials.append(word_before.word)
                    adv_positions.append(elem-1)

                #Наречие до существительного
                if word_before.pos == "ADVB":
                    adverbials.append(word_before.word)
                    adv_positions.append(elem-1)

            #Наречие до/после глагола = обстоятельство
            if (word.pos == "VERB" or word.pos == "INFN") and (word_before.pos == "ADVB" or word_after.pos == "ADVB"):
                if word_before.pos == "ADVB":
                    adverbials.append(word_before.word)
                    adv_positions.append(elem-1)
                elif word_after.pos == "ADVB":
                    adverbials.append(word_after.word)
                    adv_positions.append(elem+1)

            #Наречие до прилагательного = обстоятельство
            #Наречие до наречия = обстоятельство
            if word.pos == "ADVB" and (word_after.pos == "ADJF" or word_after.pos == "ADJS" or word_after.pos == "ADVB"):
                adverbials.append(word.word)
                adv_positions.append(elem)

            #Существительное с предлогом до/после глагола (без учёта падежа) = обстоятельство
            if word.pos == "NOUN" and word.tag.case == "nomn" and word_before.pos == "PREP" and (word_after.pos == "INFN" or word_after.pos == "VERB"):
                adverbials.append(word_before.word+" "+word.word)
                adv_positions.append(elem-1)
                adv_positions.append(elem)

            #Существительное с союзами (как, словно, будто, как будто) = обстоятельство
            if word.pos == "NOUN" and word_before.pos == "CONJ" and (word_before.word == "будто" or word_before.word == "словно" or word_before.word == "как"):
                adverbials.append(word_before.word+" "+word.word)
                adv_positions.append(elem-1)
                adv_positions.append(elem)

            #Деепричастие до существительного = обстоятельство
            #Возможно наличие перечня прилагательных между деепричастием и существительным
            if word.pos == "NOUN":
                
                #Деепричастие с существительным
                if word_before.pos == "GRND":
                    adverbials.append(word_before.word)
                    adv_positions.append(elem-1)

                #Деепричастие - перечень прилагательных - существительное  
                i=1
                while (parsed_sentence[elem-i].pos == "ADJF" or parsed_sentence[elem-i].pos == "GRND") and i<len(parsed_sentence):
                    if parsed_sentence[elem-i].pos == "GRND":
                        adverbials.append(parsed_sentence[elem-i].word+" "+word.word)
                        adv_positions.append(elem)
                        adv_positions.append(elem-i)
                        break
                    i += 1

        except AttributeError:
            pass

    #Формирование массива ключей
    for elem in range(len(parsed_sentence)):
        if(elem in adv_positions):
            analyzed_sentence[elem]="adverbial"
        else:
            analyzed_sentence[elem]=None
        
    return analyzed_sentence