def find_adverbials(parsed_sentence):
    adverbials = [] # Массив обстоятельств (словами)
    analyzed_sentence = []
    adv_positions = [] # массив позиций обстоятельств в тексте

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
            #Существительное в косвенном падеже с предлогом = обстоятельство
            #Возможно наличие перечня прилагательных между существительным в косвенном падеже и предлогом
            #Числительное + существительное в косвенном падеже = обстоятельство
            #Наречие до существительного в косвенном падеже = обстоятельство
            if word.tag.POS == "NOUN" and word.tag.case != "nomn":  

                #Сущ. с предлогом
                if word_before.tag.POS == "PREP": 
                    adverbials.append(word_before.word+" "+word.word)
                    adv_positions.append(elem-1)
                    adv_positions.append(elem)

                #Предлог - перечень прилагательных - существительное  
                i=1
                while (parsed_sentence[elem-i].tag.POS == "ADJF" or parsed_sentence[elem-i].tag.POS == "PREP") and i<len(parsed_sentence):
                    if parsed_sentence[elem-i].tag.POS == "PREP":
                        adverbials.append(parsed_sentence[elem-i].word+" "+word.word)
                        adv_positions.append(elem-i)
                        adv_positions.append(elem)
                        break
                    i += 1

                #Числительное + существительное
                if word_before.tag.POS == "NUMR":
                    adverbials.append(word_before.word)
                    adv_positions.append(elem-1)

                #Наречие до существительного
                if word_before.tag.POS == "ADVB":
                    adverbials.append(word_before.word)
                    adv_positions.append(elem-1)

            #Наречие до/после глагола = обстоятельство
            if (word.tag.POS == "VERB" or word.tag.POS == "INFN") and (word_before.tag.POS == "ADVB" or word_after.tag.POS == "ADVB"):
                if word_before.tag.POS == "ADVB":
                    adverbials.append(word_before.word)
                    adv_positions.append(elem-1)
                elif word_after.tag.POS == "ADVB":
                    adverbials.append(word_after.word)
                    adv_positions.append(elem+1)

            #Наречие до прилагательного = обстоятельство
            #Наречие до наречия = обстоятельство
            if word.tag.POS == "ADVB" and (word_after.tag.POS == "ADJF" or word_after.tag.POS == "ADJS" or word_after.tag.POS == "ADVB"):
                adverbials.append(word.word)
                adv_positions.append(elem)

            #Существительное с предлогом до/после глагола (без учёта падежа) = обстоятельство
            if word.tag.POS == "NOUN" and word.tag.case == "nomn" and word_before.tag.POS == "PREP" and (word_after.tag.POS == "INFN" or word_after.tag.POS == "VERB"):
                adverbials.append(word_before.word+" "+word.word)
                adv_positions.append(elem-1)
                adv_positions.append(elem)

            #Существительное с союзами (как, словно, будто, как будто) = обстоятельство
            if word.tag.POS == "NOUN" and word_before.tag.POS == "CONJ" and (word_before.word == "будто" or word_before.word == "словно" or word_before.word == "как"):
                adverbials.append(word_before.word+" "+word.word)
                adv_positions.append(elem-1)
                adv_positions.append(elem)

            #Деепричастие до существительного = обстоятельство
            #Возможно наличие перечня прилагательных между деепричастием и существительным
            if word.tag.POS == "NOUN":
                
                #Деепричастие с существительным
                if word_before.tag.POS == "GRND":
                    adverbials.append(word_before.word)
                    adv_positions.append(elem-1)

                #Деепричастие - перечень прилагательных - существительное  
                i=1
                while (parsed_sentence[elem-i].tag.POS == "ADJF" or parsed_sentence[elem-i].tag.POS == "GRND") and i<len(parsed_sentence):
                    if parsed_sentence[elem-i].tag.POS == "GRND":
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
        
    return analyzed_sentence