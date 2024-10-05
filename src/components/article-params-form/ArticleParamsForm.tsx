import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import {
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

import { useState, useRef } from 'react';
import clsx from 'clsx';
import { useClose } from './hooks/useClose';

import styles from './ArticleParamsForm.module.scss';

export type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	articleState,
	setArticleState,
}) => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [formState, setFormState] = useState<ArticleStateType>(articleState);
	const menuRef = useRef<HTMLDivElement>(null);

	useClose({
		isOpen: isMenuOpen,
		rootRef: menuRef,
		onClose: () => setIsMenuOpen(false),
	});

	const handleInputChange = (
		nameOption: keyof ArticleStateType,
		value: OptionType
	) => {
		setFormState({
			...formState,
			[nameOption]: value,
		});
	};

	const handleResetForm: React.FormEventHandler<HTMLFormElement> = () => {
		setFormState({ ...defaultArticleState });
		setArticleState({ ...defaultArticleState });
	};

	const handleSubmitForm: React.FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		setArticleState({ ...formState });
	};

	return (
		<div ref={menuRef}>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => setIsMenuOpen(!isMenuOpen)}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmitForm}
					onReset={handleResetForm}>
					<Text as='h2' size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(selected: OptionType) =>
							handleInputChange('fontFamilyOption', selected)
						}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='font-size'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(selected: OptionType) =>
							handleInputChange('fontSizeOption', selected)
						}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={(selected: OptionType) =>
							handleInputChange('fontColor', selected)
						}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(selected: OptionType) =>
							handleInputChange('backgroundColor', selected)
						}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(selected: OptionType) =>
							handleInputChange('contentWidth', selected)
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
